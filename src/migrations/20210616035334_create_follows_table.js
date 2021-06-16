/*
    create table `follows`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("follows", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.integer("follower");
    table.foreign("follower").references("users.id");
    table.integer("followed");
    table.foreign("followed").references("users.id");
    table.boolean("deleted").defaultTo(false);
  });
};

/*
 Drop `follows`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("follows");
};
