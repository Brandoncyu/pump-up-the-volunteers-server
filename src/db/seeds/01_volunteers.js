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
    password: hashSync('password'),
    address_line1: '2601 76th Ave Se',
    city: 'Mercer Island',
    state: "Washington",
    zip: 98040,
    Sunday: true,
    Monday: false,
    Tuesday: true,
    Wednesday: true,
    Thursday: false,
    Friday: false,
    Saturday: false
  }, {
    id: 2,
    first_name: 'Jacob',
    last_name: 'Clarke',
    email: 'instructor@galvanize.com',
    password: hashSync('password'),
    address_line1: 'Pioneer Square',
    city: 'Seattle',
    state: "Washington",
    zip: 98004,
    Sunday: true,
    Monday: false,
    Tuesday: true,
    Wednesday: true,
    Thursday: false,
    Friday: false,
    Saturday: false
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};