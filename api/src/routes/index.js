const { Router } = require('express');
const { getTripsUsersFake, usersJson } = require('../controllers/usersJson.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/trip', require('./trip.js'));
router.use('/api/driver', getTripsUsersFake);
router.use('/api/users', usersJson);

module.exports = router;
