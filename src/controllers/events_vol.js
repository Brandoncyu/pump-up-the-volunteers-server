// const { plural } = require('pluralize')
// const model = require('../models/events_vol')
// const { parseToken } = require('../lib/auth')
// const resourceName = 'event'
// async function index (req, res, next) {
//   const token = parseToken(req.headers.authorization)
//   console.log(token)
//   const volId = token.sub.id

//   const response = await model.get(volId)
//   res.json({ [ plural(resourceName) ]: response })
// }

// module.exports = {
//   index
// }
