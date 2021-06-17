const bcrypt = require("bcrypt");
const userModel = require("../models/users");
const tokenUtil = require("../utiliities/tokens");

const SESSION_EXPIRED = "persistent token expired";
const INVALID_PERSISTENT_TOKEN = "persistent token invalid";
const INVALID_TRANSACTION_TOKEN = "transaction token invalid";

const determineField = (input) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)) return "email";
  else if (/^[a-z0-9_]{5,20}$/.test(input)) {
    return "username";
  } else {
    console.log("found unknown field which should not be possible");
  }
};

const login = async (username, password, remember) => {
  let field = determineField(username);
  let userData = await userModel.getUserByField(field, username);
  if (userData) {
    let result = await bcrypt.compare(password, userData.hash);
    if (result) {
      let payload = {
        username: userData.username,
        email: userData.email,
      };
      let transactionToken = await tokenUtil.signTransactionToken(payload);
      let persistentToken = remember
        ? await tokenUtil.signLongPersistentToken(payload)
        : await tokenUtil.signPersistentToken(payload);
      return {
        transactionToken,
        persistentToken,
      };
    } else {
      return false;
    }
  }
};

const register = async (data) => {
  let { password, gender } = data;
  let hash = await bcrypt.hash(password, 10);
  let completeProfile = {
    ...data,
    hash,
    is_verified: false,
    key_color: "#333333",
    bio: "",
    last_seen: Date(),
    is_active: true,
    is_deleted: false,
    profile_picture: gender === "male" ? "/usercontent/images/johndoe.png" : "/usercontent/images/janedoe.png",
    cover_image: "/usercontent/images/defaultCover.png",
  };
  delete completeProfile.password;
  let response = await userModel.addAccount(completeProfile);
  return response;
};

const refresh = async (transactionToken, persistentToken) => {
  let persistentResponse = await tokenUtil.verifyPersistentToken(persistentToken);
  if (persistentResponse === tokenUtil.TOKEN_EXPIRED_ERROR) return SESSION_EXPIRED;
  else if (persistentResponse === tokenUtil.TOKEN_EXPIRED_ERROR) return INVALID_PERSISTENT_TOKEN;
  else {
    let transactionResponse = await tokenUtil.verifyTransactionToken(transactionToken);
    if (transactionResponse === tokenUtil.TOKEN_EXPIRED_ERROR) {
      let { username, email } = persistentResponse;
      let payload = { username, email };
      transactionToken = await tokenUtil.signTransactionToken(payload);
      return {
        transactionToken,
        persistentToken,
      };
    } else {
      return INVALID_TRANSACTION_TOKEN;
    }
  }
};

module.exports = {
  login,
  register,
  refresh,
  SESSION_EXPIRED,
  INVALID_PERSISTENT_TOKEN,
  INVALID_TRANSACTION_TOKEN,
};
