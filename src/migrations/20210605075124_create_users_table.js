/*
create table `profiles`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username");
    table.unique("username");
    table.string("email").notNull();
    table.unique("email");
    table.string("hash").notNull();
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.date("birth_date");
    table.string("gender").notNull();
    table.string("profile_picture").notNull();
    table.string("cover_image").notNull();
    table.string("bio");
    table.string("key_color");
    table.datetime("last_seen");
    table.timestamps(true, true);
    table.boolean("is_deleted").defaultTo(false);
    table.boolean("is_active");
    table.boolean("is_verified");
  });
};

/*
    Drop table `profiles`.
*/
exports.down = function down(knex) {
  return knex.schema.dropTable("users");
};
