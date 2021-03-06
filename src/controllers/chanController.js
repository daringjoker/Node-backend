const express = require("express");
const chanServices = require("../services/chans");
const threadServices = require("../services/thread");
const { sendSuccess, sendFailure } = require("../utiliities/responses");

const getAll = async (req, res) => {
  let chan_id = req.params.chan_id;
  let allChans = await chanServices.getAll();
  if (allChans) {
    sendSuccess(res, "Successfully Retrieved All Chans", allChans);
  } else {
    sendFailure(res, "Couldnot find all chans");
  }
};
const getThreads = async (req, res) => {
  let identifier = req.params.identifier;
  let allThreads = await threadServices.getAllInChan(identifier);
  if (allThreads) sendSuccess(res, "Successfully Retrieved all Threads", allThreads);
  else sendFailure(res, "Threads Retreival Failed");
};

const create = async (req, res) => {
  let data = req.body;
  let username = req.verifiedUser.username;
  let result = await chanServices.createNew(data, username);
  if (result) sendSuccess(res, "Successfully Created Chan", result);
  else sendFailure(res, "Chan Creation Failed");
};

module.exports = {
  getAll,
  create,
  getThreads,
};
