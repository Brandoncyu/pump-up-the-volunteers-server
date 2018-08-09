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
            console.log("I am the response", response)
            return response
        })
}


module.exports = {
    get
}