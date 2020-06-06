
exports.up = function(knex) {
  return knex.schema.createTable('orders', tbl => {
      tbl.increments();
      tbl.integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('patterns')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      tbl.float('order_amount')
        .notNullable()
      tbl.string('email')
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders')
};
