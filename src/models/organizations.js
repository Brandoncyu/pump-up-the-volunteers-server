const {promisify} = require('util')

const db = require('../db/knex')
const bcrypt = require('bcryptjs')
const userKey = require('./user_key')
const axios = require('axios')

async function create(body) {
  console.log('This is create function');
  console.log(body.ein)
  return axios.post(`http://data.orghunter.com/v1/charitygeolocation?user_key=${userKey}&ein=${body.ein}`).then(async (res) => {
    console.log('meeee');
    const hashed = await promisify(bcrypt.hash)(body.password, 8)
    const data = res.data.data
    const categoryName = data.nteeType
    const orgId = await retrieveId(categoryName)
    const org = {
      name: body.name,
      email: body.email,
      password: hashed,
      ein: parseInt(body.ein),
      description: body.description,
      logo: body.logo,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zipCode,
      latitude: data.latitude,
      longitude: data.longitude,
      option_id: orgId
    }

    return db('organizations')
    .insert(org).returning('*')
    .then(([response]) => {
      return response
    }).catch(console.log)
  }).catch(console.log)
}

function login({email, password}) {
  return db('organizations').where({email}).then(async ([org]) => {
    if (!org) 
      throw new Error()

    const isValid = await promisify(bcrypt.compare)(password, org.password) //hash the password that user puts in, compares with the hased in db
    if (!isValid) 
      throw new Error()

    return org
  }).catch(console.log)
}

function retrieveId(categoryName) {
  return db('options').where({name: categoryName}).first().then(response => {
    return response.id
  }).catch(error => console.log('Category Not Found'))
}

module.exports = {
  create,
  login
}
