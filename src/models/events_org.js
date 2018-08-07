const db = require('../db/knex')

function get(orgId) {
    return db('events')
        .where({
            org_id: orgId
        })
        .then(events => {
            console.log("getAll for org in model", events)
            return events
        })
}

function find(id) {
    return db('lists').where({
        id
    }).first()
}

function create(body) {
    return db('lists')
        .insert(body)
        .returning('*')
        .then(([response]) => response)
}

function destroy(id) {
    return db('lists')
        .where({
            id
        })
        .del()
        .returning('*')
        .then(([response]) => response)
}

module.exports = {
    get,
    find,
    create,
    destroy
}