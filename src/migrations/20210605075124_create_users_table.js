/*
    create table `users` 
*/
exports.up=function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.timestamps(true,true);
    table.boolean("is_deleted");
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.foreign("accounts_id").refrences("accounts");
    table.string("profile_picture").notNull();
    table.string("key_color");
    table.string("bio");
    table.string("cover_image").notNull();
    table.boolean("is_active");
    table.timestamp("last_seen");
  });
}

/*
    Drop table `users`.
*/
exports.down= function down(knex) {
  return knex.schema.dropTable('users');
}