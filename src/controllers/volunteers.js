const model = require('../models/volunteers')
const auth = require('../lib/auth')

async function signup(req, res, next) {
  try {
    const response = await model.create(req.body)
    const interestList = await model.interestFinder(response.id)
    const token = auth.createToken(response.id)
    const days = [
      response.Sunday,
      response.Monday,
      response.Tuesday,
      response.Wednesday,
      response.Thursday,
      response.Friday,
      response.Saturday
    ]
    interests = interestList.map(element => element.option_id)
    const id = response.id

    res.status(201).json({token, days, interests, id})
  } catch (e) {
    next({status: 400, error: `Volunteer could not be registered`})
  }
}

async function login(req, res, next) {
  try {
    const response = await model.login(req.body)
    const interestList = await model.interestFinder(response.id)
    const token = auth.createToken(response.id)
    const days = [
      response.Sunday,
      response.Monday,
      response.Tuesday,
      response.Wednesday,
      response.Thursday,
      response.Friday,
      response.Saturday
    ]
    const id = response.id
    interests = interestList.map(element => element.option_id)

    res.json({token, days, interests, id})
  } catch (e) {
    next({status: 401, error: `Email or password is incorrect`})
  }
}

module.exports = {
  signup,
  login
}
