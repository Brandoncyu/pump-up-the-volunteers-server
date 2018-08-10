const model = require('../models/organizations')
const auth = require('../lib/auth')

async function getAll(req, res, next){
  let data = await model.getAll()
  res.send({data})
}

async function signup(req, res, next) {
  try {
    const response = await model.create(req.body)
    const token = auth.createToken(response.id)
    const id = response.id
    const ein = response.ein
    const description = response.description
    const logo = response.logo
    const street = response.street
    const city = response.city
    const state = response.state
    const zip = response.zip

    res.status(201).json({
      token,
      id,
      ein,
      description,
      logo,
      street,
      city,
      state,
      zip
    })
  } catch (e) {
    next({status: 400, error: `Organization could not be registered`})
  }
}

async function login(req, res, next) {
  try {
    const response = await model.login(req.body)
    const token = auth.createToken(response.id)
    const id = response.id
    const ein = response.ein
    const description = response.description
    const logo = response.logo
    const street = response.street
    const city = response.city
    const state = response.state
    const zip = response.zip

    res.json({
      token,
      id,
      ein,
      description,
      logo,
      street,
      city,
      state,
      zip
    })
  } catch (e) {
    next({status: 401, error: `Email or password is incorrect`})
  }
}

module.exports = {
  getAll,
  signup,
  login
}
