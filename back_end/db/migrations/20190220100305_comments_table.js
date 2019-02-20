exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(tbl) {
    tbl.increments()

    tbl
      .string('content', 128)
      .notNullable()

    tbl
      .string('author', 128)
      .notNullable()

    tbl
      .string('date', 128)
      .notNullable()

    tbl
      .integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};