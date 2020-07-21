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
    type: Schema.Types.ObjectId,
    ref: 'tickets'
  }]
},
{
  timestamps: true
})

module.exports = mongoose.model("events", Event)