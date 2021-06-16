const jwt = require("jsonwebtoken");
const usersModel = require("../models/users");
const { sendFailure } = require("../utiliities/responses");

module.exports = authenticate = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let transactionToken = authHeader.replace("Bearer ", "");
  jwt.verify(transactionToken, "IamSECRET", (error, decoded) => {
    if (error) {
      sendFailure(res, "transaction token expired", [], 403);
    } else {
      res.verifiedUser = decoded;
    }
  });
};
