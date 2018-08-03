const {
  hashSync
} = require('bcryptjs')

const table = 'volunteers'
exports.seed = knex => {
  return knex(table).insert([{
      id: 1,
      first_name: "Jessica",
      last_name: "Alba",
      email: "student@galvanize.com",
      password: hashSync('password')
    }, {
      id: 2,
      first_name: 'Jacob',
      last_name: 'Clarke',
      email: 'instructor@galvanize.com',
      password: hashSync('password')
    }])
    .then(() => {
      return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
    });
};