const db = require('../db/knex')

function get(days, categories) {
    const daysArr = JSON.parse(days)
    const categoriesArr = JSON.parse(categories)
    console.log(categoriesArr, "I am categoriesArr")

    return db('options')
        .join('organizations', 'organizations.option_id', "=", "options.id")
        .join('events', 'events.org_id', '=', 'organizations.id')
        // .join('volunteers_events', 'volunteers_events.event_id', '=', 'events.id')
        .whereIn('option_id', categoriesArr)
        .whereIn('day', daysArr)
        .returning('*')
        .then(response => {
            console.log("I am the response", response)
            return response
        })
}

function createFavorite(body) {
    const volunteerId = body.volId
    const theEventId = body.eventId

    const bodyInsert = {
        vol_id: volunteerId,
        event_id: theEventId,
        status: body.status
    }
    return db('volunteers_events')
        .where({
            vol_id: `${volunteerId}`,
            event_id: `${theEventId}`
        })
        .then(response => {
            if (response.length > 0) {
                // patch 
                return db('volunteers_events')
                    .update({
                        ...bodyInsert
                    })
                    .where({
                        vol_id: `${volunteerId}`,
                        event_id: `${theEventId}`
                    })
                    .returning('*')
                    .then(([response]) => response)
            } else {
                // post
                return db('volunteers_events')
                    .insert(bodyInsert)
                    .returning('*')
                    .then(([response]) => {
                        console.log("I am the response in createFravorite in model", response)
                        return response
                    })
            }
            console.log("Checking the response", response)
        })
}


module.exports = {
    get,
    createFavorite
}