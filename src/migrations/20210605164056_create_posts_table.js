/*
    create table `posts`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.boolean("deleted").defaultTo(false);
    table.string("text_content", 1024);
    table.string("image_content");
    table.integer("parent_post");
    table.integer("user_id").notNull();
    table.foreign("user_id").references("profiles.id");
    table.boolean("public").defaultTo(true);
  });
};

/*
 Drop `posts`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("posts");
};
