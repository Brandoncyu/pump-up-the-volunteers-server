const db = require('../db/knex')

function get(orgId) {
    return db('events')
        .where({
            org_id: orgId
        })
        .then(events => {
            return events
        })
}

// function getOne(orgId, id) {
//     return db('events')
//         .where({
//             org_id: orgId,
//             id: id
//         })
//         .first()
// }


// check the route. 
function create(body) {
    return db('events')
        .insert(body)
        .returning('*')
        .then(([response]) => response)
}


function find(id) {
    return db('events')
    .where({
        id
    }).first()
}

function patch(id, body) {
    return find(id).then(response => {
        return db('events')
            .update({
                ...response,
                ...body,
                updated_at: new Date()
            })
            .where({
                id
            })
            .returning('*')
            .then(([response]) => response)
    })
}

function destroy(id) {
    return db('events')
        .where({
            id
        })
        .del()
        .returning('*')
        .then(([response]) => response)
}

module.exports = {
    get,
    // getOne,
    create,
    patch,
    destroy
}