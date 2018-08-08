const {hashSync} = require('bcryptjs')

const table = 'events'

exports.seed = knex => {
  return knex(table).insert([
    {
      id: 1,
      title: "Music Fest",
      description: "Music, foodtrucks and more",
      date: "08-08-2018",
      street: "120 6TH AVE N STE 100",
      city: "SEATTLE",
      state: "WA",
      zip: "98109-5002",
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: true,
      Thursday: false,
      Friday: false,
      Saturday: false,
      org_id: 1
    }, {
      id: 2,
      title: "Food Fest",
      description: "Food, Music, foodtrucks and more",
      date: "08-02-2018",
      street: "120 6TH AVE N STE 100",
      city: "SEATTLE",
      state: "WA",
      zip: "98109-5002",
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: true,
      Friday: false,
      Saturday: false,
      org_id: 1
    }, {
      id: 3,
      title: "Food Fest",
      description: "Food, Music, foodtrucks and more",
      date: "09-09-2018",
      street: "120 6TH AVE N STE 100",
      city: "SEATTLE",
      state: "WA",
      zip: "98109-5002",
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: true,
      Thursday: false,
      Friday: false,
      Saturday: false,
      org_id: 1
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};
