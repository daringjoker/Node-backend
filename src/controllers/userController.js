const express = require("express");
const userServices = require("../services/user");
const { sendSuccess, sendFailure } = require("../utiliities/responses");

const getSelf = async (req, res) => {
  let username = req.verifiedUser.username;
  let data = await userServices.getUserDeep(username);
  if (data) sendSuccess(res, "Successfully Retrieved User", data);
  else sendFailure(res, "User Retrieval Failed");
};

const getUser = async (req, res) => {
  let username = req.params.username;
  let data = await userServices.getUserShallow(username);
  if (data) sendSuccess(res, "Successfully Retrieved User", data);
  else sendFailure(res, "User Retrieval Failed");
};

module.exports = {
  getSelf,
  getUser,
};
