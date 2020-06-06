
exports.up = function(knex) {
  return knex.schema.createTable('patterns', tbl => {
      tbl.increments();
      tbl.string('name')
        .notNullable()
        .unique()
      tbl.string('image_url')
        .notNullable()
      tbl.text('description')
        .notNullable()
      tbl.float('price')
        .notNullable()
      tbl.string('yarn_weight')
      tbl.string('hook_size')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('patterns')
};
