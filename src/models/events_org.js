const db = require('../db/knex')

function get(orgId) {
  return db('events').where({
    org_id: orgId
  }).then(events => {
    return events
  })
}

function dateObj(weekDay) {
  let parts = weekDay.split('-'),
    year = parseInt(parts[0], 10),
    month = parseInt(parts[1], 10) - 1, // NB: month is zero-based!
    day = parseInt(parts[2], 10),
    date = new Date(year, month, day);

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const result = days[date.getDay()]
  let daysObj = {
    day: result
  }

  return daysObj
}

function create(body) {
  const date = body.date
  const bodyInsert = {
    ...body,
    ...dateObj(date)
  }
  return db('events')
    .insert(bodyInsert)
    .returning('*')
    .then(([response]) => response)
}

function find(id) {
  return db('events')
    .where({id})
    .first()
}

function patch(id, body) {
  return find(id).then(response => {
    if (body.date) {
      const date = body.date
      return db('events')
        .update({
          ...response,
          ...body,
          ...dateObj(date),
          updated_at: new Date()
        })
          .where({id})
          .returning('*')
          .then(([response]) => response)
    } else {
      return db('events')
        .update({
          ...response,
          ...body,
          updated_at: new Date()
        })
        .where({id})
        .returning('*')
        .then(([response]) => response)
    }
  })
}

function destroy(id) {
  return db('events')
    .where({id})
    .del()
    .returning('*')
    .then(([response]) => response)
}

module.exports = {
  get,
  create,
  patch,
  destroy
}
