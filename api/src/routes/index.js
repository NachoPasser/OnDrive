const { Router } = require('express');
const usersJson = require('../controllers/usersJson.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/trips', require('./trips.js'))
router.use('/driver', require('./driver.js'))
router.use('/api/users', usersJson);

module.exports = router;
