const express = require("express");
const chanCreateSchema = require("../validator/chans");
const validateSchema = require("../middlewares/validator");
const authenticate = require("../middlewares/authentication");
const chanController = require("../controllers/chanController");

const chanRouter = express.Router();
chanRouter.get("/", authenticate, chanController.getAll);
chanRouter.put("/", authenticate, validateSchema(chanCreateSchema), chanController.create);
module.exports = chanRouter;
