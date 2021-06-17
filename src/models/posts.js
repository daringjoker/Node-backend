const knex = require("../db");

class postsModel {
  static async create(data) {
    try {
      let userData = await knex("posts").insert(data, "id");
      return userData;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  static async getById(id) {
    let userData = await knex("posts").select().where("id", id).andWhere("is_deleted", false);
    return userData.length > 1 ? userData : userData[0];
  }

  static async getByUser(user_id) {
    let userData = await knex("posts").select().where("user_id", user_id).andWhere("is_deleted", false);
    if (userData) return userData;
    else return false;
  }
  static async getByThread(thread_id) {
    let userData = await knex("posts").select().where("thread_id", thread_id).andWhere("is_deleted", false);
    if (userData) return userData;
    else return false;
  }
}

module.exports = postsModel;
