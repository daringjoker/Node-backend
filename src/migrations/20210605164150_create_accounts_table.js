/*
    create table `accounts` 
*/
export function up(knex) {
  return knex.schema.createTable('accounts', table => {
    table.increments('id');
    table.timestamps(true,true);
    table.boolean("deleted").defaultTo(false);
    table.string("username");
    table.string("email").notNull();
    table.string("hash").notNull();
  });
}

/*
 Drop table `accounts`.
 */
export function down(knex) {
  return knex.schema.dropTable('accounts');
}