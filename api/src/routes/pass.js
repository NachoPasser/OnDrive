const router = require('express').Router();
const {recoverPassword, changePass} = require('../controllers/passwordController.js');

router.post('/', recoverPassword)
router.post('/change/:token', changePass)


module.exports = router;