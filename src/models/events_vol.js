const db = require('../db/knex')

function get(days) {
    return db('options')
    .join('organizations', 'options.id', '=', 'organizations.option_id')
    .join('events', 'organizations.id', '=', 'events.org_id')
    .orWhere({Sundays: days[0] })
    .orWhere({Monday: days[1]})
    .orWhere({Tuesday: days[2]})
    .orWhere({Wednesday: days[3]})
    .orWhere({Thursday: days[4]})
    .orWhere({Friday: days[5]})
    .orWhere({Saturday: days[6]})
    


    .where({org_id: orgId}).then(events => {
      return events
    })
  }
  


module.exports = {
    get,
    patch
}