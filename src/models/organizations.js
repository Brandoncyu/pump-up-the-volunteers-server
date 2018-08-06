const {
    promisify
} = require('util')

const db = require('../db/knex')
const bcrypt = require('bcryptjs')
const userKey = require('./user_key')
const axios = require('axios')

async function create(body) {
    console.log('This is create function');
    console.log(body.ein)
    axios.post(`http://data.orghunter.com/v1/charitygeolocation?user_key=${userKey}&ein=${body.ein}`)
        .then(async (res) => {
            console.log('meeee');
            const hashed = await promisify(bcrypt.hash)(body.password, 8)
            const data = res.data.data
            const org = {
                name: data.name,
                email: body.email,
                password: hashed,
                ein: body.ein,
                description: body.description,
                logo: body.logo,
                street: data.street,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode,
                latitude: data.latitude,
                longtitude: data.longtitude
            }
            return db('organizations')
                .insert(org)
                .returning('*')
                .then(([response]) => response)
                .catch(console.log)
        })
        .catch(console.log)
}

function login({
    email,
    password
}) {
    return db('organizations')
        .where({
            email
        })
        .then(async ([org]) => {
            if (!org) throw new Error()

            const isValid = await promisify(bcrypt.compare)(password, org.password) //hash the password that user puts in, compares with the hased in db
            if (!isValid) throw new Error()

            return org
        })
        .catch(console.log)
}

module.exports = {
    create,
    login
}