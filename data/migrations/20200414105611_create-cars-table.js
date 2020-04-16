
exports.up = function(knex) {
  return knex.schema.createTable('cars', (table) => {
    table.increments('id');
    table.integer('vin').notNullable().unique();
    table.text('make').notNullable();
    table.text('model').notNullable();
    table.integer('mileage').notNullable();
    table.boolean('clean');
    table.boolean('salvage');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};
