const db = require('../db/knex')

function get(days, categories) {
  const daysArr = JSON.parse(days)
  const categoriesArr = JSON.parse(categories)

  return db('options')
    .join('organizations', 'organizations.option_id', "=", "options.id")
    .join('events', 'events.org_id', '=', 'organizations.id')
    .whereIn('option_id', categoriesArr)
    .whereIn('day', daysArr)
    .returning('*')
    .then(response => {
        return response
    })
}

function getEvents(id){
  return db('volunteers_events')
    .where({vol_id: id})
    .then(response => {
         return db('volunteers_events')
            .where({vol_id: id})
            .then(response => response)

     })
}

function createFavorite(body) {
  const volunteerId = body.volId
  const theEventId = body.eventId

  const bodyInsert = {
    vol_id: parseInt(volunteerId),
    event_id: parseInt(theEventId),
    status: JSON.parse(body.status)
  }
  return db('volunteers_events')
    .insert(bodyInsert)
    .returning('*')
    .then(([response]) => response)
}


module.exports = {
    get,
    getEvents,
    createFavorite
}
