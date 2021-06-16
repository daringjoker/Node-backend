/*
    create table `table_name`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("table_name", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.integer("moderator_for");
    table.foreign("moderator_for").references("chans.id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.integer("privilege_level");
    table.boolean("deleted").defaultTo(false);
  });
};

/*
 Drop `table_name`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("table_name");
};
