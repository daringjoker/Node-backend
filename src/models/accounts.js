const knex = require("../db");
const bcrypt = require("bcrypt");
const UserProfiles = require("./users");

class UserAccounts {
  static getUserByField(field, value) {
    return new Promise((resolve, reject) => {
      knex("accounts")
        .select()
        .where(field, value)
        .andWhere("deleted", false)
        .then((res) => {
          resolve(res[0]);
        });
    });
  }
  static verifyByField(field, username, password) {
    return new Promise((resolve, reject) => {
      knex("accounts")
        .select("hash")
        .where(field, username)
        .andWhere("deleted", false)
        .then((resp) => {
          if (resp.length <= 0) resolve(false);
          else {
            let realHash = resp[0].hash;
            bcrypt.compare(password, realHash, (err, match) => {
              if (err) throw err;
              else {
                if (match) resolve(true);
                else resolve(false);
              }
            });
          }
        });
    });
  }

  static addAccount(username, email, hash) {
    return new Promise((resolve, reject) => {
      knex("accounts")
        .insert({
          username: username,
          email: email,
          hash: hash,
          deleted: false,
        })
        .then((resp) => {
          UserProfiles.initializeProfile(username);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = UserAccounts;
