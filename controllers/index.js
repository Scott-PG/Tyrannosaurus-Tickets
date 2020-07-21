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

// write all functions that are not for router here

// ===============================
// 
//  Functions NOT For Router
// 
// ===============================

// given the name on the ticket, userID and eventID, generate an encrypted string and return it 
const encryptTicketQR = async (user_ID, event_ID, name_on_ticket) => {
  try {
    const time_generated = new Date().toUTCString()

    const payload = {
      user_ID,
      event_ID,
      name_on_ticket,
      time_generated
    }

    encrypted_string = jwt.sign(payload, QR_TOKEN_KEY)

    return { encrypted_string, time_generated }
  } catch (er) {
    console.log(er)
  }
}

// decrypt encrypted string 
const decryptTicketQR = async (qr_string) => {
  try {
    const decrypted_object = jwt.verify(qr_string, QR_TOKEN_KEY)

    return decrypted_object
  } catch (er) {
    console.log(er)
  }
}

// given the ticket_ID and its corresponding userID and eventID, link this ticket in the ticket_IDs field of the corresponding user and event 
const linkTicket = async (ticket_ID, user_ID, event_ID) => {
  try {
    console.log(user_ID)
    console.log(event_ID)
    
    const user = await User.findById(user_ID)
    const event = await Event.findById(event_ID)

    console.log(user)
    console.log(event)

    user.ticket_IDs.push({ ticket_ID, event_ID })
    await user.save()

    event.ticket_IDs.push({ ticket_ID, user_ID })
    await event.save()

  } catch (er) {
    console.log(er)
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
async function signUp(req, res) {
  console.log('in sign up')
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
    console.log("Made it to signUp controller, but there was an error")
    return res.status(400).json({ error: error.message })
  }
}

// ===============================
// 
//  QR Codes
// 
// ===============================


// export functions to be used in routes 
module.exports = {
  encryptTicketQR, decryptTicketQR, linkTicket,
  signIn, signUp, verifyUser
}