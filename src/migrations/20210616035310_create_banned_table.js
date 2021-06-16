/*
    create table `banned`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("banned", (table) => {
    table.increments("id");
    table.integer("banned_from");
    table.foreign("banned_from").references("chans.id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.string("reason", 200);
    table.timestamps(true, true);
    table.boolean("deleted").defaultTo(false);
  });
};

/*
 Drop `banned`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("banned");
};
