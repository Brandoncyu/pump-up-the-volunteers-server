const table = 'address'
exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    user_id: 1,
    address_line1: '2601 76th Ave Se',
    address_line2: 'Unit 551',
    city: 'Mercer Island',
    state: "Washington",
    country: 'United States',
    zip: 98040
  }, {
    id: 2,
    user_id: 2,
    address_line1: 'Pioneer Square',
    address_line2: 'Galvanize ',
    city: 'Seattle',
    state: "Washington",
    country: 'United States',
    zip: 98004
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  })
};