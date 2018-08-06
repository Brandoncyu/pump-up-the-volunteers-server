const model = require('../models/organizations')
const auth = require('../lib/auth')

async function signup(req, res, next) {
  console.log("this is signup inside controller")
  try {
    const response = await model.create(req.body)
    const token = auth.createToken(response.id)

    res.status(201).json({
      token
    })
  } catch (e) {
    next({
      status: 400,
      error: `Volunteer could not be registered`
    })
  }
}

async function login(req, res, next) {
  try {
    const response = await model.login(req.body)
    const token = auth.createToken(response.id)

    res.json({
      token_org: token
    })
  } catch (e) {
    next({
      status: 401,
      error: `Email or password is incorrect`
    })
  }
}

module.exports = {
  signup,
  login
}