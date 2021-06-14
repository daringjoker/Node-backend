const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../validator");
const UserAccounts = require("../models/accounts");
const userController = require("../controllers/userController");

const log = require("../middlewares/logger");

apiRouter = express.Router();

apiRouter.use("/user", userController);

/*
login is done by issuing post request to /api/users/login
username/email
password
*/

apiRouter.post("/login", (req, res) => {
  let username = req.body.username;
  let field = "";
  if (/^[a-z0-9]{5,30}$/.test(username)) {
    field = "username";
  } else if (validateEmail(username)) {
    field = "email";
  } else {
    //suplied username does not satisfy the username or email specification
    //the request must be declared invalid.
    res.status(400);
    res.json({
      status: "failed",
      msg: "Invalid username or email",
      data: [],
    });
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
          res.json({
            status: "success",
            msg: "login Successful",
            data: { transactionToken, persistentToken },
          });
        });
      } else {
        res.status(401);
        res.json({
          status: "failed",
          msg: `${field} or password did not match`,
          data: [],
        });
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
apiRouter.post("/register", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let pass = req.body.password;
  bcrypt.hash(pass, 10, function (err, hash) {
    if (err) throw err;
    else {
      UserAccounts.addAccount(username, email, hash)
        .then(() => {
          res.json({
            status: "success",
            msg: "registration Successful!!",
            data: [],
          });
        })
        .catch((err) => {
          res.status(400);
          res.json({
            status: "failed",
            msg: "could not Create a new userAccount",
            data: err,
          });
        });
    }
  });
});

apiRouter.post("/refresh", (req, res) => {
  let tokens = req.body.tokens;
  jwt.verify(tokens.persistentToken, "IamSECRET", (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        res.json({
          status: "failed",
          msg: "Persistent Token Expired",
          data: [],
        });
      else {
        res.json({
          status: "failed",
          msg: err.message + " for Persistent Token",
          data: [],
        });
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
                res.json({
                  status: "success",
                  msg: "Token Refreshed Successfully",
                  data: {
                    transactionToken: newToken,
                    persistentToken: tokens.persistentToken,
                  },
                });
              } else {
                res.json({
                  status: "failed",
                  msg: "user has been invalidated",
                  data: [],
                });
              }
            });
          } else {
            res.json({
              status: "failed",
              msg: err.message + " for transaction token",
              data: [],
            });
          }
        } else {
          res.json({
            status: "failed",
            msg: "Transaction Token has not Expired Yet",
            data: [],
          });
        }
      });
    }
  });
});

module.exports = apiRouter;
