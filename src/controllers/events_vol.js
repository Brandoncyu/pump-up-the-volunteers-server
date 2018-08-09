const {
    plural
} = require('pluralize')
const model = require('../models/events_vol')
const {
    parseToken
} = require('../lib/auth')


const resourceName = 'event'

async function index(req, res, next) {
    const token = parseToken(req.headers.authorization)
    // console.log(token)
    // const volId = token.sub.id
    const days = req.query.days
    const categories = req.query.interests
    const response = await model.get(days, categories)

    res.json({
        [plural(resourceName)]: response
    })
}

async function patch(req, res, next) {
    console.log("HELLO, PATCH")
    const id = req.params.id
    const response = await model.patch(id, req.body)
    res.json({
        [resourceName]: response
    })
}

module.exports = {
    index,
    patch
}