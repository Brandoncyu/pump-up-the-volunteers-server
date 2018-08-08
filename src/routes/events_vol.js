const router = require('express').Router()
const ctrl = require('../controllers/events_vol')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index)
router.patch('/:id', auth.isAuthorized, ctrl.patch)

// router.getOne('/:id', auth.isLoggedIn, ctrl.getOne)

module.exports = router
