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
    const days = req.query.days
    const categories = req.query.interests
    const response = await model.get(days, categories)

    res.json({
        [plural(resourceName)]: response
    })
}

async function getEvents(req, res, next){
  const volId = req.params.volId
  const response = await model.getEvents(volId)

  res.json({
    [plural(resourceName)]: response
  })
}

async function createFavorite(req, res, next) {
    try {
         const response = await model.createFavorite(req.body)

        res.status(200).json({
            [resourceName]: response
        })
    } catch (e) {
        console.log(e)
        next({
            status: 400,
            error: `Event could not be created`
        })
    }
}

// async function patch(req, res, next) {
//     try {
//         console.log("HELLO, PATCH")
//         const id = req.params.id
//         const response = await model.patch(id, req.body)
//         res.json({
//             [resourceName]: response
//         })
//     } catch (e) {
//         console.log(e)
//         next({
//             status: 400,
//             error: `Event could not be created`
//         })
//     }
// }

module.exports = {
    index,
    createFavorite,
    getEvents
    // patch
}
