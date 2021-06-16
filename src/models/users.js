const knex = require("../db");
const bcrypt = require("bcrypt");

class Users {
   static getUserByField(field, value) {
    return new Promise((resolve, reject) => {
      knex("users")
        .select()
        .where(field, value)
        .andWhere("is_deleted", false)
        .then((res) => {
          resolve(res[0]);
        });
    });
  }
  static verifyByField(field, value, password) {
    return new Promise((resolve, reject) => {
      knex("users")
        .select("hash")
        .where(field, value)
        .andWhere("is_deleted", false)
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

  static addAccount(data) {
    let { username, email, hash, first_name, last_name, gender, birth_date } =
      data;
    return new Promise((resolve, reject) => {
      knex("users")
        .insert({
          username,
          email,
          hash,
          first_name,
          last_name,
          gender,
          birth_date,
          is_verified: false,
          key_color: "#333333",
          bio: "",
          last_seen: Date(),
          is_active: true,
          is_deleted: false,
          profile_picture:
            gender === "male"
              ? "/usercontent/images/johndoe.png"
              : "/usercontent/images/janedoe.png",
          cover_image: "/usercontent/images/defaultCover.png",
        })
        .then((resp) => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
}

module.exports = Users;
