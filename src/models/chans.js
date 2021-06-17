const knex = require("../db");

class chansModel {
  static async create(data) {
    try {
      let userData = await knex("chans").insert(data, "id");
      return userData;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  static async getByIdentifier(identifier) {
    let userData = await knex("chans").select().where("identifier", identifier).andWhere("is_deleted", false);
    return userData.length > 1 ? userData : userData[0];
  }

  static async getVerified() {
    let userData = await knex("chans").select().where("approved", true).andWhere("is_deleted", false);
    if (userData) return userData;
    else return false;
  }

  static async getAll() {
    let unverified = await this.getVerifiedChans();
    let verified = await this.getVerifiedChans();
    return {
      verified,
      unverified,
    };
  }

  static async getId(identifier) {
    let userData = await knex("chans").select("id").where("identifier", identifier).andWhere("is_deleted", false);
    return userData.length > 1 ? userData : userData[0];
  }
  static async getUnverified() {
    let userData = await knex("chans").select().where("approved", false).andWhere("is_deleted", false);
    return userData.length > 1 ? userData : userData[0];
  }
}

module.exports = chansModel;
