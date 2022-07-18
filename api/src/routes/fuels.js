const { lookFuelModel, fetchTable, fillModel } = require('../controllers/fuelsController.js');
const router = require('express').Router();

router.get('/db', lookFuelModel);//PARA TODOS, '/fuels' PREVIAMENTE
router.get('/table', fetchTable);//PARA TODOS, '/fuels' PREVIAMENTE
router.post('/table', fillModel);//PARA TODOS, '/fuels' PREVIAMENTE

module.exports = router;