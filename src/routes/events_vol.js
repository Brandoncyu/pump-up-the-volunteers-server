const router = require('express').Router()
const ctrl = require('../controllers/events_vol')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index)
router.getOne('/:id', auth.isLoggedIn, ctrl.getOne)

module.exports = router