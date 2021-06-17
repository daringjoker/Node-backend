const express = require("express");
const userRouter = require("./userRouter");
const chanRouter = require("./chanRouter");
const threadRouter = require("./threadRouter");
const validateSchema = require("../middlewares/validator");
const authController = require("../controllers/authController");
const { signupSchema, refreshSchema, loginSchema } = require("../validator/auth");

apiRouter = express.Router();

apiRouter.use("/user", userRouter);

apiRouter.use("/chans", chanRouter);

apiRouter.use("/threads", threadRouter);

apiRouter.post("/login", validateSchema(loginSchema), authController.login);

apiRouter.post("/register", validateSchema(signupSchema), authController.register);

apiRouter.post("/refresh", validateSchema(refreshSchema), authController.refresh);

module.exports = apiRouter;
