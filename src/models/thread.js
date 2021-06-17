const knex = require("../db");

class threadsModel {
  static async create(data) {
    try {
      let userData = await knex("threads").insert(data, "id");
      return userData;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  static async getById(id) {
    let userData = await knex("threads").select().where("id", id).andWhere("is_deleted", false);
    return userData.length > 1 ? userData : userData[0];
  }

  static async getAllByChan(chanId) {
    let userData = await knex("threads").select().where("chan_id", chanId).andWhere("is_deleted", false);
    return userData;
  }
  static async getAllByUser(userId) {
    let userData = await knex("threads").select().where("user_id", chanId).andWhere("is_deleted", false);
    return userData;
  }
}

module.exports = threadsModel;
