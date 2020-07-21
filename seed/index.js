const db = require("../db")
const User = require("../models/users")
const Ticket = require("../models/tickets")
const Event = require("../models/events")

db.on("error", console.error.bind(console, "MongoDB Connection Error:"))

