const {hashSync} = require('bcryptjs')

const table = 'organizations'

exports.seed = knex => {
  return knex(table).insert([
    {
      id: 1,
      name: "EXPERIENCE LEARNING COMMUNITY",
      email: 'info@mopop.org',
      password: hashSync('password'),
      ein: 911626784,
      description: "Music and more",
      logo: 'https://goo.gl/G1FHJB',
      street: "120 6TH AVE N STE 100",
      city: "SEATTLE",
      state: "WA",
      zipCode: "98109-5002",
      latitude: "47.619471",
      longitude: "-122.344641",
      option_id: 1
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};
