const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/trip', require('./trip.js'));
router.use('/api', require('./users.js'));
router.use('/auth', require('./auth.js'));
router.use('/admin', require('./admin.js'));

module.exports = router;
