const knex = require("../db");

class userModel {
  static async getUserByField(field, value) {
    let userData = await knex("users").select().where(field, value).andWhere("is_deleted", false);
    return userData.length > 1 ? userData : userData[0];
  }
  static async getByUsername(username) {
    return await this.getUserByField("username", username);
  }
  static async getId(username) {
    return await knex("users").select("id").where("username", username).andWhere("is_deleted", false);
  }
  static async addAccount(data) {
    try {
      const result = await knex("users").insert(data);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = userModel;
