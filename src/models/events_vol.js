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

// function findEvent(eventId, body) {
//     console.log("days", body.days, "categories", body.categories)

//     return get(body.days, body.categories)
//         .where({
//             id: eventId
//         })
//         .first()
// }

// async function patch(eventId, body) {
//     const response = await findEvent(eventId, body)

//     return db('options')
//         .join('organizations', 'organizations.option_id', "=", "options.id")
//         .join('events', 'events.org_id', '=', 'organizations.id')
//         .join('volunteers_events', 'volunteers_events.event_id', '=', 'events.id')
//         .whereIn('option_id', body.categories)
//         .whereIn('day', body.days)
//         .update({
//             ...response,
//             status: body.status,
//             updated_at: new Date()
//         })
//         .where({
//             id: eventId
//         })
//         .returning('*')
//         .then(([response]) => response)

// }


module.exports = {
    get
    // patch
}