const { pagos, posteo, pagosId } = require('../controllers/pagoController.js');
const router = require('express').Router();

router.post('/', posteo);
router.get('/pagos', pagos);
router.get('/pagos/:id', pagosId);

module.exports = router;