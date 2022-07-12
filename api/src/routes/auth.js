const {registerUser, getUsers, logUser, checkUserIsLogged} = require('../controllers/authController.js')
const router = require('express').Router();

router.post('/register', registerUser)
router.post('/login', logUser)
router.get('/users', getUsers)
router.get('/profile', getUsers)
router.get('/verify', checkUserIsLogged)

module.exports = router;