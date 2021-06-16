/*
    create table `joined`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("joined", (table) => {
    table.increments("id");
    table.integer("chan_id");
    table.foreign("chan_id").references("chans.id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.timestamps(true, true);
    table.boolean("deleted").defaultTo(false);
  });
};

/*
 Drop `joined`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("joined");
};
