const table = 'volunteers_events'
exports.seed = knex => {
  return knex(table).del()
    .then(() => {
      return knex(table).insert([{
          vol_id: 1,
          event_id: 1,
          status: 1
        }, {
          vol_id: 2,
          event_id: 1,
          status: 1
        }])
        .then(() => {
          return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
        })
    })
};