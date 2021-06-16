/*
    create table `posts`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.integer("author_id");
    table.foreign("author_id").references("users.id");
    table.integer("thread_id");
    table.foreign("thread_id").references("threads.id");
    table.integer("chan_id");
    table.foreign("chan_id").references("chans.id");
    table.text("content");
    table.boolean("with_media").defaultTo(false);
    table.integer("parent_post").defaultTo(0);
    table.string("media_link", 2048);
    table.enu("media_type", ["image", "video", "audio", "link", "doc"]);
    table.timestamps(true, true);
    table.boolean("deleted").defaultTo(false);
    table.boolean("approved").defaultTo(false);
  });
};

/*
 Drop `posts`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("posts");
};
