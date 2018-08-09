const db = require('../db/knex')

function get(days, categories) {
    const daysArr = JSON.parse(days)
    const categoriesArr = JSON.parse(categories)

    return db('options')
        .join('organizations', 'organizations.option_id', "=", "options.id")
        .join('events', 'events.org_id', '=', 'organizations.id')
        .join('volunteers_events', 'volunteers_events.event_id', '=', 'events.id')
        .whereIn('option_id', categoriesArr)
        .whereIn('day', daysArr)
        .returning('*')
        .then(response => {
            console.log("I am the response", response)
            return response
        })
}

// function findEvent(body, eventId) {
//     return get(body.days, body.categories)
//         .where({
//             id: eventId
//         })
//         .first()
// }

async function patch(eventId, body) {
    return get(body.days, body.categories)
        .where({
            id: eventId
        })
        .first()
        .then(response => {
            return db('options')
                .join('organizations', 'organizations.option_id', "=", "options.id")
                .join('events', 'events.org_id', '=', 'organizations.id')
                .join('volunteers_events', 'volunteers_events.event_id', '=', 'events.id')
                .whereIn('option_id', body.categories)
                .whereIn('day', body.days)
                .update({
                    ...response,
                    status: body.status,
                    updated_at: new Date()
                })
                .where({
                    id: eventId
                })
                .returning('*')
                .then(([response]) => response)
        })
}


module.exports = {
    get,
    patch
}