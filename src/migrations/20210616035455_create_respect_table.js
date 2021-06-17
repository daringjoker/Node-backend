/*
    create table `respects`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("respects", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.integer("respected_id");
    table.foreign("respected_id").references("users.id");
    table.boolean("is_deleted").defaultTo(false);
  });
};

/*
 Drop `respects`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("respects");
};
