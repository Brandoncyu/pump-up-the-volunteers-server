const {hashSync} = require('bcryptjs')

const table = 'organizations'

exports.seed = knex => {
  return knex(table).insert([
    {
      id: 1,
      name: 'SOUND MENTAL HEALTH',
      email: 'stephen.mclean@sound.health',
      password: hashSync('password'),
      ein: 910818971
    }, {
      id: 2,
      name: "EXPERIENCE LEARNING COMMUNITY",
      email: 'info@mopop.org',
      password: hashSync('password'),
      ein: 911626784
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};
