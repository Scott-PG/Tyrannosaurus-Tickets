// setting up variables for server.js
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./db')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }))
app.use(morgan('dev'))
app.use(cors())
 
// assign routes
app.use('/api', routes)

// error catching on database 
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// set up express app to listen 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('listening to port ' + PORT))