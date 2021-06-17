const jwt = require("jsonwebtoken");
const TOKEN_EXPIRED_ERROR = "token expired";
const INVALID_TOKEN_ERROR = "invalid token";
const {
  TRANSACTION_TOKEN_SECRET,
  PERSISTENT_TOKEN_SECRET,
  TRANSACTION_TOKEN_DURATION,
  PERSISTENT_TOKEN_DEFAULT_DURATION,
  PERSISTENT_TOKEN_EXTENDED_DURATION,
} = require("../config");

const signPersistentToken = async (payload) => {
  const token = await jwt.sign(payload, PERSISTENT_TOKEN_SECRET, {
    expiresIn: PERSISTENT_TOKEN_DEFAULT_DURATION,
  });
  if (!token) return false;
  else return token;
};

const signLongPersistentToken = async (payload) => {
  const token = await jwt.sign(payload, PERSISTENT_TOKEN_SECRET, {
    expiresIn: PERSISTENT_TOKEN_EXTENDED_DURATION,
  });
  if (!token) return false;
  else return token;
};

const signTransactionToken = async (payload) => {
  const token = await jwt.sign(payload, TRANSACTION_TOKEN_SECRET, {
    expiresIn: TRANSACTION_TOKEN_DURATION,
  });
  if (!token) return false;
  else return token;
};

const verifyPersistentToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, PERSISTENT_TOKEN_SECRET);
    return decoded;
  } catch (e) {
    if (e.name === jwt.TokenExpiredError.name) return TOKEN_EXPIRED_ERROR;
    else return INVALID_TOKEN_ERROR;
  }
};

const verifyTransactionToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, TRANSACTION_TOKEN_SECRET);
    return decoded;
  } catch (e) {
    if (e.name === jwt.TokenExpiredError.name) return TOKEN_EXPIRED_ERROR;
    else return INVALID_TOKEN_ERROR;
  }
};

module.exports = {
  signTransactionToken,
  signPersistentToken,
  signLongPersistentToken,
  verifyPersistentToken,
  verifyTransactionToken,
  TOKEN_EXPIRED_ERROR,
  INVALID_TOKEN_ERROR,
};
