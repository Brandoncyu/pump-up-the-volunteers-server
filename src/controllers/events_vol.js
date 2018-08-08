const {
    plural
} = require('pluralize')
const model = require('../models/events_vol')
const {
    parseToken
} = require('../lib/auth')
const resourceName = 'event'

async function index(req, res, next) {
    const days = req.query.days
    const categories = req.query.vol_opt
    
    const token = parseToken(req.headers.authorization)
    console.log(token)
    const volId = token.sub.id

    const response = await model.get(days)
    res.json({
        [plural(resourceName)]: response
    })
}

async function patch(req, res, next) {
    try {
        const id = req.params.id
        const response = await model.patch(id, req.body)
        res.json({
            [resourceName]: response
        })
    } catch (e) {
        console.log('!!!!', e)
        next({
            status: 400,
            error: `Event could not be updated`
        })
    }
}

module.exports = {
    index,
    patch
}