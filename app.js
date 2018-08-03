const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3000

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(cors())

app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Not found'
    }
  })
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
