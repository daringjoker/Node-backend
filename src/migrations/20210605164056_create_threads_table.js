/*
    create table `threads`
*/
exports.up = function up(knex) {
  return knex.schema.createTable("threads", (table) => {
    table.increments("id");
    table.timestamps(true, true);
    table.boolean("is_deleted").defaultTo(false);
    table.string("title", 200);
    table.integer("chan_id");
    table.foreign("chan_id").references("chans.id");
    table.integer("creator").notNull();
    table.foreign("creator").references("user.id");
    table.boolean("public").defaultTo(true);
    table.boolean("archived").defaultTo(false);
  });
};

/*
 Drop `threads`.
 */
exports.down = function down(knex) {
  return knex.schema.dropTable("threads");
};
