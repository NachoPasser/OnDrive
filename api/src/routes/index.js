const { Router } = require('express');
const {getTripsUsersFake} = require('../controllers/usersJson.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/trip', require('./trip.js'));
router.use('/api/driver', getTripsUsersFake);
module.exports = router;
