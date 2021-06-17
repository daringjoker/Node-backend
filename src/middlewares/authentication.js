const { sendFailure } = require("../utiliities/responses");
const { verifyTransactionToken, TOKEN_EXPIRED_ERROR, INVALID_TOKEN_ERROR } = require("../utiliities/tokens");

module.exports = authenticate = async (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"];
    let transactionToken = authHeader.replace("Bearer ", "");
    let result = await verifyTransactionToken(transactionToken);
    if (result === TOKEN_EXPIRED_ERROR) {
      sendFailure(res, "Transaction Token Expired");
    } else if (result === INVALID_TOKEN_ERROR) {
      throw 1;
    } else {
      let { username, email } = result;
      req.verifiedUser = { username, email };
      next();
    }
  } catch {
    sendFailure(res, "Transaction Token Error");
  }
};
