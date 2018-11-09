const {
    plural
} = require('pluralize')
const model = require('../models/events_org')
const {
    parseToken
} = require('../lib/auth')
const resourceName = 'event'

async function index(req, res, next) {
    const token = parseToken(req.headers.authorization)
    const orgId = token.sub.id

    const response = await model.get(orgId)
    res.json({
        [plural(resourceName)]: response
    })
}

async function create(req, res, next) {
    try {
      const token = parseToken(req.headers.authorization)
      const orgId = token.sub.id
      req.body.org_id = orgId
      console.log("I am req.body",req.body)
      const response = await model.create(req.body)
      res.status(201).json({
          [resourceName]: response
      })
    } catch (e) {
        next({
            status: 400,
            error: `Event could not be created`
        })
    }
}

async function patch(req, res, next) {
  try {
    const id = req.params.id
    const response = await model.patch(id, req.body)
    res.json({
        [resourceName]: response
    })
  } catch (e) {
      next({
          status: 400,
          error: `Event could not be updated`
      })
  }
}

async function destroy(req, res, next) {
    try {
        const id = req.params.id
        const response = await model.destroy(id)
        res.json({
            [resourceName]: response
        })
    } catch (e) {
        next({
            status: 400,
            error: `Event could not be destroyed`
        })
    }
}

module.exports = {
    index,
    create,
    patch,
    destroy
}
