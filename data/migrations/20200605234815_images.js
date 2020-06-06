
exports.up = function(knex) {
  return knex.schema.createTable('images', tbl => {
      tbl.increments()
      tbl.string('image_url')
        .notNullable()
      tbl.string('name')
        .notNullable()
      tbl.string('category')
        .notNullable()
      tbl.integer('pattern_id')
        .unsigned()
        .references('id')
        .inTable('patterns')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('images')
};
