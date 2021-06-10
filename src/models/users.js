const knex = require("../db");
const bcrypt = require("bcrypt");

const defaultProfile = {
  first_name: "John",
  last_name: "Doe",
  profile_picture: "johnDoe.png",
  bio: "A Deep Diver Of nothingness!!",
  cover_image: "defaultCover.png",
  is_active: true,
  last_seen: Date.now(),
  key_color: "#165baa",
  is_deleted: false,
  is_verified: false,
  birth_date: Date.now(),
  gender: "male",
};

class UserProfiles {
  static initializeProfile(username) {
    let id = 0;
    knex("accounts")
      .select("id")
      .where("username", username)
      .andWhere("deleted", false)
      .then((res) => {
        id = res[0].id;
        knex("profiles")
          .insert({ ...defaultProfile, accounts_id: res[0].id })
          .then((res) => {
            console.log(
              "initialized a new user for account id " +
                id +
                " and username " +
                username
            );
          });
      });
  }


  static getProfileByUsername(value) {
    return new Promise((resolve, reject) => {
      knex("accounts")
        .select("id")
        .where("username", value)
        .andWhere("deleted", false)
        .then((res) => {
          if (res[0]) {
            knex("profiles")
              .select()
              .where("accounts_id", res[0].id)
              .then((res) => {
                resolve(res[0]);
              });
          }
        });
    });
  }
  static something(field, username, password) {
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
  static updateProfile(
    username,
    firstName,
    lastName,
    bio,
    cover_image,
    profile_image
  ) {
    return new Promise((resolve, reject) => {
      knex("accounts")
        .insert({
          username: username,
          email: email,
          hash: hash,
          deleted: false,
        })
        .then((resp) => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = UserProfiles;
