/*
    create table `moderators`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("moderators", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.integer("moderator_for");
    table.foreign("moderator_for").references("chans.id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.integer("privilege_level");
    table.boolean("is_deleted").defaultTo(false);
  });
};

/*
 Drop `moderators`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("moderators");
};
