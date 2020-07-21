const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ticket = new Schema({
  user_ID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  ticket_ID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'tickets'
  },
  name_on_ticket: {
    type: String,
    required: true 
  },
  time_last_generated: {
    type: String,
    required: false 
  },
  qr_code_encrypted: {
    type: String,
    required: true 
  }
},
{
  timestamps: true
})

module.exports = mongoose.model("tickets", Ticket)