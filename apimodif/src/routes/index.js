const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = require("./userRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use("/user", userRouter);


module.exports = router;
