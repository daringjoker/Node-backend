/*
    create table `profiles`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("profiles", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.boolean("is_deleted");
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.string("gender").notNull();
    table.timestamp("birth_date");
    table.integer("accounts_id").notNull();
    table.foreign("accounts_id").references("accounts.id");
    table.string("profile_picture").notNull();
    table.string("key_color");
    table.string("bio");
    table.string("cover_image").notNull();
    table.boolean("is_active");
    table.boolean("is_verified");
    table.timestamp("last_seen");
  });
};

/*
    Drop table `profiles`.
*/
exports.down = function down(knex) {
  return knex.schema.dropTable("profiles");
};
