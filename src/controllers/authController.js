const authServices = require("../services/auth");
const { sendSuccess, sendFailure } = require("../utiliities/responses");

const login = async (req, res) => {
  let { username, password, required } = req.body;
  let result = await authServices.login(username, password, required);
  if (result) {
    sendSuccess(res, "Login Successful!", result);
  } else {
    sendFailure(res, "Login Failed");
  }
};

const register = async (req, res) => {
  let result = await authServices.register(req.body);
  if (result) {
    sendSuccess(res, "User Registered Successfuly");
  } else {
    sendFailure(res, "User Registration Failed");
  }
};

const refresh = async (req, res) => {
  let { persistentToken, transactionToken } = req.body.tokens;
  let result = await authServices.refresh(transactionToken, persistentToken);
  if (result === authServices.INVALID_PERSISTENT_TOKEN) {
    sendFailure(res, "Invalid Persistent Token");
  } else if (result === authServices.INVALID_TRANSACTION_TOKEN) {
    sendFailure(res, "Invalid Transaction Token");
  } else if (result === authServices.SESSION_EXPIRED) {
    sendFailure(res, "Persistent Token Expired");
  } else {
    sendSuccess(res, "Tokens Refreshed Successfully", result);
  }
};

module.exports = {
  login,
  register,
  refresh,
};
