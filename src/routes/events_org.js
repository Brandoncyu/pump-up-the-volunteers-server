const router = require('express').Router()
const ctrl = require('../controllers/events_org')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index)
// router.getOne('/:id', auth.isLoggedIn, ctrl.getOne)
router.post('/', auth.isLoggedIn, ctrl.create)
router.patch('/:id', auth.isLoggedIn, ctrl.patch)
router.delete('/:id', auth.isLoggedIn, ctrl.destroy)

module.exports = router
