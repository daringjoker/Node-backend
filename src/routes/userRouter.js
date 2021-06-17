const express = require("express");
const validateSchema = require("../middlewares/validator");
const authenticate = require("../middlewares/authentication");
const userController = require("../controllers/userController");
userRouter = express.Router();

userRouter.get("/", authenticate,userController.getSelf);

userRouter.get("/:username", userController.getUser);

userRouter.post("/:username",);

userRouter.post("");
module.exports = userRouter;
