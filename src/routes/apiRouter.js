const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../validator");
const UserAccounts = require("../models/users");
const userController = require("../controllers/userController");
const { sendSuccess, sendFailure } = require("../utiliities/responses");
const validateSchema = require("../middlewares/validator");
const { loginSchema, signupSchema } = require("../validator/users");
const log = require("../middlewares/logger");

apiRouter = express.Router();

apiRouter.use("/user", userController);

/*
login is done by issuing post request to /api/users/login
username/email
password
*/

apiRouter.post("/login", validateSchema(loginSchema), (req, res) => {
  let username = req.body.username;
  let field = "";
  if (/^[a-z0-9_]{5,20}$/.test(username)) {
    field = "username";
  } else if (validateEmail(username)) {
    field = "email";
  } else {
    sendFailure(res, "invalid email or username", [], 400);
  }
  UserAccounts.verifyByField(field, req.body.username, req.body.password).then(
    (verified) => {
      if (verified) {
        let userData = UserAccounts.getUserByField(
          field,
          req.body.username
        ).then((userData) => {
          let payload = {
            username: userData.username,
            email: userData.email,
          };
          let transactionToken = jwt.sign(payload, "IamSECRET", {
            expiresIn: "10m",
          });
          let persistentToken = null;
          if (req.body.remember) {
            persistentToken = jwt.sign(
              { ...payload, persistentToken: true },
              "IamSECRET",
              {
                expiresIn: "7d",
              }
            );
          } else {
            persistentToken = jwt.sign(
              { ...payload, persistentToken: true },
              "IamSECRET",
              {
                expiresIn: "1d",
              }
            );
          }
          sendSuccess(res, "login Successful!", {
            transactionToken,
            persistentToken,
          });
        });
      } else {
        sendFailure(res, `${field} or password did not match`, [], 401);
      }
    }
  );
});

/*
  structure of data is {
  email,
  username,
  hash
  }
  hash is obtained from the password using the middleware
*/
apiRouter.post("/register", validateSchema(signupSchema), (req, res) => {
  let pass = req.body.password;
  bcrypt.hash(pass, 10, function (err, hash) {
    if (err) throw err;
    else {
      UserAccounts.addAccount({ ...req.body, hash })
        .then(() => {
          sendSuccess(res, "registration Successful!");
        })
        .catch((err) => {
          sendFailure(res, "Could not register new user", err, 400);
        });
    }
  });
});

apiRouter.post("/refresh", (req, res) => {
  let tokens = req.body.tokens;
  jwt.verify(tokens.persistentToken, "IamSECRET", (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        sendFailure(res, "Persistent Token Expired!");
      else {
        sendFailure(res, err.msg + " for Persistent Token");
      }
    } else {
      jwt.verify(tokens.transactionToken, "IamSECRET", (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            //this is what we want
            UserAccounts.getUserByField(
              "username",
              jwt.decode(tokens.transactionToken).username
            ).then((userData) => {
              if (userData) {
                let payload = {
                  username: userData.username,
                  email: userData.email,
                };
                let newToken = jwt.sign(payload, "IamSECRET", {
                  expiresIn: "10m",
                });
                sendSuccess(res, "Token Refreshed Successfully!", {
                  persistentToken: tokens.persistentToken,
                  newToken,
                });
              } else {
                sendFailure(res, "The User has been Invalidated!");
              }
            });
          } else {
            sendFailure(res, err.msg + " for transaction token");
          }
        } else {
          sendFailure(res, "Transaction token has not expired yet");
        }
      });
    }
  });
});

module.exports = apiRouter;
