const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const { PORT = 5000, NODE_ENV = 'development' } = process.env

if (NODE_ENV === 'development') {
  require('dotenv').load()
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(cors())

app.use('/api/volunteers', require('./routes/volunteers'))
app.use('/api/organizations', require('./routes/organizations'))

// Fix this part to include events 
app.use('/api/lists', require('./routes/lists'))
app.use('/api/lists/:listId/tasks', require('./routes/tasks'))


app.use((err, req, res, next) => {
  if (NODE_ENV === 'development') console.error(err)

  const message = `Something went wrong.`
  const { status = 500, error = message } = err

  res.status(status).json({ status, error })
})

app.use((req, res, next) => {
  const status = 404
  const error = `Could not ${req.method} ${req.url}`

  next({ status, error })
})

if (NODE_ENV !== 'testing') {
  const listener = () => console.log(`Listening on port ${PORT}!`)
  app.listen(PORT, listener)
}

module.exports = app
