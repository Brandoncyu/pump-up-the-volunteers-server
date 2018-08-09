const router = require('express').Router()
const ctrl = require('../controllers/organizations')

router.get('/', ctrl.getAll)
router.post('/signup', ctrl.signup)
router.post('/login', ctrl.login)

module.exports = router
