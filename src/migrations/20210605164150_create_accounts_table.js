/*
    create table `accounts`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("accounts", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.boolean("deleted").defaultTo(false);
    table.string("username");
    table.string("email").notNull();
    table.unique("username");
    table.unique("email");
    table.string("hash").notNull();
  });
};

/*
 Drop table `accounts`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("accounts");
};
