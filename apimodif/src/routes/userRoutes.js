const { Router } = require("express");

const userRouter = Router();

const { getAllUsers } = require("../Controllers/userController");


userRouter.get("/", getAllUsers);


module.exports = userRouter;