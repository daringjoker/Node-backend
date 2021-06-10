const express = require("express");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../validator");
const UserAccounts = require("../models/accounts");
const UserProfiles = require("../models/users");

userController = express.Router();

userController.get("/:username", (req, res) => {
  let username = req.params.username;
  UserProfiles.getProfileByUsername(username).then((profile) => {
    res.json({
      status: "success",
      msg: "User Retrieved Successfully",
      data: profile,
    });
  });
});

userController.post("/:username", (req, res) => {});

userController.post("");
module.exports = userController;
