const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const {
  PORT = 5000, NODE_ENV = 'development'
} = process.env

if (NODE_ENV === 'development') {
  require('dotenv').load()
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(cors())

app.use('/api/volunteers', require('./src/routes/volunteers'))
app.use('/api/organizations', require('./src/routes/organizations'))
// app.use('/api/organizations/events', require('./src/routes/events_org.js'))
// app.use('/api/volunteers/events', require('.src/routes/events_vol.js'))

// Fix this part to include events ???
// app.use('/api/volunteers/events', require('./routes/events'))
// app.use('/api/organizations/events', require('./routes/events'))

app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)

  const message = `Something went wrong.`
  const {
    status = 500, error = message
  } = err

  res.status(status).json({
    status,
    error
  })
})

app.use((req, res, next) => {
  const status = 404
  const error = `Could not ${req.method} ${req.url}`

  next({
    status,
    error
  })
})

if (NODE_ENV !== 'testing') {
  const listener = () => console.log(`Listening on port ${PORT}!`)
  app.listen(PORT, listener)
}

module.exports = app
