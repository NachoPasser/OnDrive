const { pagos, posteo, pagosId, reception } = require('../controllers/pagoController.js');
const router = require('express').Router();

router.post('/', posteo);
router.get('/pagos', pagos);
router.get('/pagos/:id', pagosId);

router.get('/reception', reception);
router.post('/reception', reception);

// router.get('/test', test);

// router.post('/access-token', access__token);
// router.get('/access-token', access__token);

module.exports = router;