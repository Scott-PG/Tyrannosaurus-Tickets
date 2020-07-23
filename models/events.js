const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema({
  event_name: {
    type: String,
    required: true,
    unique: true 
  },
  event_location: {
    type: String,
    required: true 
  },
  event_startTime: {
    type: String,
    required: true 
  },
  event_description: {
    type: String,
    required: true 
  },
  ticket_IDs: [{
    ticket_ID: {
      type: Schema.Types.ObjectId,
      ref: 'tickets'
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  event_instructions: {
    type: String,
    required: true 
  },
  event_security: {
    type: String,
    required: true 
  }
},
{
  timestamps: true
})

module.exports = mongoose.model("events", Event)