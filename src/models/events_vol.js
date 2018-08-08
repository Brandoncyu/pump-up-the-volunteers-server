const db = require('../db/knex')

function get(days, categories) {
    return db('options')
        .join('organizations', 'organizations.option_id', "=", "options.id")
        .join('events', 'events.org_id', '=', 'organizations.id')
        .whereIn('option_id', JSON.parse(categories))
        //.whereIn('day', JSON.parse(days))
        .returning('*')
        .then(response => {
            console.log("I am the response", response)
            return response
        })
        .then(console.log)
}

module.exports = {
    get

}