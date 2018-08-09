const router = require('express').Router()
const ctrl = require('../controllers/events_vol')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, auth.isAuthorizedVol, ctrl.index)
router.get('/:volId', auth.isLoggedIn, auth.isAuthorizedVol, ctrl.getEvents)
// router.patch('/:id', auth.isLoggedIn, auth.isAuthorizedVol, ctrl.patch)
router.post('/', auth.isLoggedIn, auth.isAuthorizedVol, ctrl.createFavorite)

module.exports = router
