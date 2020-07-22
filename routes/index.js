const { Router } = require('express')
const router = Router()
const controllers = require('../controllers')
const restrict = require("../helpers")

// root route 
router.get('/', (req, res) => {
  res.json('This is root.')
})

// ==========
//  USER
// ==========

//sign-in
router.post("/signin", (req, res) => controllers.signIn(req, res))

//sign-up
router.post("/signup", (req, res) => controllers.signUp(req, res))

//verify user
router.get('/verifyuser', (req, res) => controllers.verifyUser(req, res))

// ==========
//  Events
// ==========

// all events, but without ticket information 
router.get("/events", (req, res) => controllers.getEvents(req, res))

router.get("/userevents", (req, res) => controllers.getUserEvents(req, res))


// ==========
//  Export 
// ==========
module.exports = router