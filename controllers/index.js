const db = require('../db')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/users")
const Ticket = require("../models/tickets")
const Event = require("../models/events")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// include this every time db is used 
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// salt rounds for bcrypt
const SALT_ROUNDS = 11

// token key for jwt 
const TOKEN_KEY = process.env.TOKEN_KEY 
const QR_TOKEN_KEY = process.env.QR_TOKEN_KEY 

// for randomly generating a letter (not entire alphabet)
// for demo purposes only (would be handled in a different file in real implementation)
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

// write all functions that are not for router here

// ===============================
// 
//  Functions NOT For Router
// 
// ===============================

// given the name on the ticket, userID and eventID, generate an encrypted string and return it 
const encryptTicketQR = async (ticket_ID, name_on_ticket) => {
  try {
    const time_generated = new Date().toUTCString()

    const payload = {
      ticket_ID,
      name_on_ticket,
      time_generated
    }

    encrypted_string = jwt.sign(payload, QR_TOKEN_KEY)

    return encrypted_string
  } catch (error) {
    console.log(error)
  }
}

// decrypt encrypted string 
const decryptTicketQR = async (qr_string) => {
  try {
    const decrypted_object = jwt.verify(qr_string, QR_TOKEN_KEY)

    return decrypted_object
  } catch (error) {
    console.log(error)
  }
}

// given the ticket_ID and its corresponding userID and eventID, link this ticket in the ticket_IDs field of the corresponding user and event 
const linkTicket = async (ticket_ID, user_ID, event_ID) => {
  try {
    console.log('---Linking Ticket To User And Event---')
    console.log(user_ID)
    console.log(event_ID)
    
    const user = await User.findById(user_ID)
    const event = await Event.findById(event_ID)

    // console.log(user)
    // console.log(event)

    user.ticket_IDs.push({ ticket_ID, event_ID })
    await user.save()

    event.ticket_IDs.push({ ticket_ID, user_ID })
    await event.save()

    return true 
  } catch (error) {
    console.log(error)
    return false 
  }
}

// given a req, determine the user_ID from the token. this lets us know which user based on their token has tried to access a route 
const userOfRequest = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const legit = jwt.verify(token, TOKEN_KEY)
    
    if (legit) {
      return legit
    }
    return false 
  } catch (error) {
    console.log(error)
    return false 
  }
}

// write router functions here, all take args req and res from router

// ===============================
// 
//  USER - signup, signin, verify
// 
// ===============================

//verify user
const verifyUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const legit = jwt.verify(token, TOKEN_KEY)
    console.log(legit)
    if (legit) {
      res.json(legit)
    }
  } catch (error) {
    res.status(401).send('Not Authorized')
  }
}

//sign-in
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        user_real_name: user.user_real_name 
      }
      console.log('about to sign')
      const token = jwt.sign(payload, TOKEN_KEY)
      console.log('token')
      return res.status(201).json({ user, token })
    } else {
      res.status(401).send("Invalid Credentials")
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//sign-up
const signUp = async (req, res) => {
  try {
    const { username, password, user_real_name } = req.body

    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await new User({
      username,
      password_digest,
      user_real_name
    })
    await user.save()

    const payload = {
      id: user._id,
      username: user.username,
      user_real_name: user.user_real_name 
    }

    const token = jwt.sign(payload, TOKEN_KEY)

    return res.status(201).json({ user, token })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// ===============================
// 
//  Events 
// 
// ===============================

// get all events but respond without ticket info 
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()

    // we are going to remove the key/value pair of ticket_IDs before sending it in the response 
    // delete <object>.<keyname> doesn't seem to work so the property is set to null for now (normally would be an array)
    events.forEach(event => {
      event.ticket_IDs = null
    })

    return res.json(events)

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// get all events that have tickets of the user whose token is detected 
const getUserEvents = async (req, res) => {
  try {
    const user_ID = userOfRequest(req).id
    if (user_ID) {
      // query events where user_ID is in the array ticket_IDs.user_ID 
      const foundEvents = await Event.find({
        'ticket_IDs.user_ID': user_ID 
      })

      // for each event, filter out all tickets unless they match the user_ID (because the others do not belong to this user)
      const events = foundEvents.map(event => {
        // ticket_IDs is an array holding objects with 2 key/value pairs: ticket_ID and user_ID
        user_ticket_count = event.ticket_IDs.filter(ticket_obj => {
          return ticket_obj.user_ID.toString() === user_ID.toString()
        }).length 

        // don't include array of tickets in this response, they will be included in route for requesting only one event 
        event.ticket_IDs = null 

        return {event_data: event, user_ticket_count}
      })

      return res.json(events)
    } else {
      res.status(400).json({error: "No valid user token detected."})
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// get all events that have tickets of the user whose token is detected 
const getUserEvent = async (req, res) => {
  try {
    // get user id from token 
    const user_ID = userOfRequest(req).id

    // get event id from req.params 
    const event_ID = req.params.id 

    const event = await Event.findById(event_ID).populate('ticket_IDs.ticket_ID')

    //filter out all tickets unless they match the user_ID (because the others do not belong to this user)
    
    // ticket_IDs is an array holding objects with 2 key/value pairs: ticket_ID and user_ID
    event.ticket_IDs = event.ticket_IDs.filter(ticket_obj => {
      return ticket_obj.user_ID.toString() === user_ID.toString()
    })

    return res.json(event)

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


// ===============================
// 
//  Tickets and QR codes
// 
// ===============================

const decryptTicket = async (req, res) => {
  try {
    // receive qrCode in req.body 
    const { encrypted_qr_code } = req.body 

    const qrInfo = await decryptTicketQR(encrypted_qr_code)

    const ticket = await Ticket.findById(qrInfo.ticket_ID).populate('event_ID')

    if (encrypted_qr_code === ticket.qr_code_encrypted) {
      // change the ticket_scanned from false to true 
      await Ticket.findByIdAndUpdate(qrInfo.ticket_ID, { ticket_scanned: true }, (error, ticket) => {
        if (error) {
          return res.status(500).json({ error: error.message })
        }
        if (!ticket) {
          return res.status(404).json({ error: "Ticket not found!" })
        }
      })

      return res.json(ticket)
    } else {
      return res.status(400).json({ error: "Ticket QR code does not match database record." })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// generate a ticket given a name_on_ticket, user_ID and event_ID 
const generateTicket = async (req, res) => {
  try {
    // get user id from token 
    const userInfo = userOfRequest(req)
    const user_ID = userInfo.id 

    if (!user_ID) {
      return res.status(403).json({ error: "No valid JSON Web Token. Please log in first." })
    }

    // get name and event_ID from req.body 
    const {name_on_ticket, event_ID} = req.body 

    // show info about request in logs 
    console.log('--Request Body Info--')
    console.log(name_on_ticket)
    console.log(event_ID)

    // check if name_on_ticket is a valid string 
    if (!name_on_ticket) {
      name_on_ticket = userInfo.user_real_name 
    }

    if (typeof name_on_ticket !== "string" || name_on_ticket.length < 1) {
      name_on_ticket = userInfo.user_real_name 
    }

    name_on_ticket = 'test name'

    // show the final name_on_ticket before creating ticket
    console.log('--Final Name Of Ticket--')
    console.log(name_on_ticket)

    // create random seating details for demo purposes
    const ticket_details = []
    ticket_details.push(`Seat: ${Math.ceil(Math.random() * 50)}-${letters[Math.round(Math.random()*(letters.length-1))]}`)
    ticket_details.push(`Section: ${Math.ceil(Math.random()*10)}`)

    // create ticket
    const ticket = await new Ticket({
      user_ID,
      event_ID,
      name_on_ticket,
      ticket_scanned: false,
      ticket_details 
    })

    // generate QR code and add it to ticket 
    const qrCode = await encryptTicketQR(ticket._id, name_on_ticket)

    ticket.qr_code_encrypted = qrCode 

    // save the ticket to db
    await ticket.save()

    // link this ticket to user and event 
    // linkTicket returns true if successful and false if error thrown 
    const tryLink = await linkTicket(ticket._id, user_ID, event_ID)

    if (tryLink) {
      // respond with ticket to confirm 
    return res.json(ticket)
    } else {
      // respond with error message 
      return res.status(404).json({ error: "Invalid user or event detected." })
    }
    

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// ===============================
// 
//  EXPORT FUNCTIONS 
// 
// ===============================

// export functions to be used in routes 
module.exports = {
  encryptTicketQR, decryptTicketQR, linkTicket,
  signIn, signUp, verifyUser,
  getEvents, getUserEvents, getUserEvent,
  decryptTicket, generateTicket 
}