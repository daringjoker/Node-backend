/*
    create table `posts` 
*/
export function up(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('id');
    table.timestamps(true,true);
    table.boolean("deleted").defaultTo(false);
    table.string("text_content",1024);
    table.string("image_content");
    table.foreign("user_id").refrences("users");
    table.boolean("public").defaultTo(true);
  });
}

/*
 Drop `posts`.
 */
export function down(knex) {
  return knex.schema.dropTable('posts');
}