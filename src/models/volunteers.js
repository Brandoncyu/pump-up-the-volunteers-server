const {promisify} = require('util')

const db = require('../db/knex')
const bcrypt = require('bcryptjs')

function popOptions(interests, userId) {
  interests.forEach(el => {
    let option = {
      vol_id: userId,
      option_id: el
    }
    return db('volunteers_options').insert(option).returning('*').then(([response]) => {
      return response
    }).catch(console.log)
  })
}

async function create(body) {
  const hashed = await promisify(bcrypt.hash)(body.password, 8)

  const vol = {
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    password: hashed,
    address_line1: body.address1,
    city: body.city,
    state: body.state,
    zip: parseInt(body.zip),
    Sunday: body.days[0],
    Monday: body.days[1],
    Tuesday: body.days[2],
    Wednesday: body.days[3],
    Thursday: body.days[4],
    Friday: body.days[5],
    Saturday: body.days[6]
  }
  return db('volunteers').insert(vol).returning('*').then(([response]) => {
    const userId = response.id
    const interests = body.interests
    popOptions(interests, userId)
    return response
  }).catch(console.log)
}

function login({email, password}) {
  return db('volunteers').where({email}).then(async ([vol]) => {
    if (!vol)
      throw new Error()

    const isValid = await promisify(bcrypt.compare)(password, vol.password) //hash the password that user puts in, compares with the hased in db
    if (!isValid)
      throw new Error()

    return vol
  }).catch(console.log)
}

function interestFinder(vol_id) {
  return db('volunteers_options').where({vol_id}).then(response => response).catch(console.log)
}

module.exports = {
  create,
  login,
  interestFinder
}
