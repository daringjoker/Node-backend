/*
    create table `blocked`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("blocked", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.integer("blocker");
    table.foreign("blocker").references("users.id");
    table.integer("blocked");
    table.foreign("blocked").references("users.id");
    table.boolean("deleted").defaultTo(false);
  });
};

/*
 Drop `blocked`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("blocked");
};
