/*
    create table `dislikes`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("dislikes", (table) => {
    table.increments("id");
    table.integer("post_id");
    table.foreign("post_id").references("posts.id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.timestamps(true, true);
    table.boolean("deleted").defaultTo(false);
  });
};

/*
 Drop `dislikes`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("dislikes");
};
