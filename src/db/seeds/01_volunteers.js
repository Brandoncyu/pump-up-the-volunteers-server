const {hashSync} = require('bcryptjs')

const table = 'volunteers'
exports.seed = knex => {
  return knex(table).insert([
    {
      id: 1,
      first_name: "Jessica",
      last_name: "Alba",
      email: "student@galvanize.com",
      password: hashSync('password'),
      address_line1: '2601 76th Ave Se',
      address_line2: 'Unit 551',
      city: 'Mercer Island',
      state: "Washington",
      country: 'United States',
      zip: 98040
    }, {
      id: 2,
      first_name: 'Jacob',
      last_name: 'Clarke',
      email: 'instructor@galvanize.com',
      password: hashSync('password'),
      address_line1: 'Pioneer Square',
      address_line2: 'Galvanize ',
      city: 'Seattle',
      state: "Washington",
      country: 'United States',
      zip: 98004
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};
