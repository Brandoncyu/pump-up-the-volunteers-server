const {
  hashSync
} = require('bcryptjs')

const table = 'events'

exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    title: "Music Fest",
    description: "Music, foodtrucks and more",
    date: "08/08/2018",
    street: "120 6TH AVE N STE 100",
    city: "SEATTLE",
    state: "WA",
    zip: "98109-5002",
    org_id: 1
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};