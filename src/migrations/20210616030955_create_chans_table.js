/*
    create table `chans`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("chans", (table) => {
    table.increments("id");
    table.string("name", 200);
    table.string("identifier", 10);
    table.string("description", 2048);
    table.string("rules", 1024);
    table.integer("admin_id");
    table.foreign("admin_id").references("users.id");
    table.string("color");
    table.enu("visibility", ["public", "privileged", "private", "secret"]);
    table.timestamps(true, true);
    table.boolean("archived").defaultTo(false);
    table.boolean("deleted").defaultTo(false);
  });
};

/*
 Drop `chans`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("chans");
};
