const bcrypt = require("bcrypt");
const express = require("express");
const users = require("../models/users");
const { validateEmail } = require("../validator");
const authenticate = require("../middlewares/authentication");
const { sendSuccess, sendFailure } = require("../utiliities/responses");

userController = express.Router();

userController.get("/", authenticate, (req, res) => {
  users
    .getUserByField("username", req.verifiedUser.username)
    .then((profile) => {
      sendSuccess(res, "user retrieved successfully", profile);
    });
});

userController.get("/:username", (req, res) => {
  let username = req.params.username;
  users.getUserByField("username", username).then((profile) => {
    sendSuccess(res, "user retrieved successfully", profile);
  });
});

userController.post("/:username", (req, res) => {});

userController.post("");
module.exports = userController;
