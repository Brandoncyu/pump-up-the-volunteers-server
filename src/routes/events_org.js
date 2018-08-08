const router = require('express').Router()
const ctrl = require('../controllers/events_org')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index)
// router.getOne('/:id', auth.isLoggedIn, ctrl.getOne)
router.post('/', auth.isLoggedIn, auth.isAuthorizedOrg, ctrl.create)
router.patch('/:id', auth.isLoggedIn, auth.isAuthorizedOrg, auth.isAuthorizedOrgEvent, ctrl.patch)
router.delete('/:id', auth.isLoggedIn, auth.isAuthorizedOrg, auth.isAuthorizedOrgEvent, ctrl.destroy)

module.exports = router