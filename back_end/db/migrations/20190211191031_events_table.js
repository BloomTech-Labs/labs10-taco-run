exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(tbl) {
    tbl.increments()

    tbl
      .string('name', 128)
      .notNullable()

    tbl
      .string('date')
      .notNullable()

    tbl
      .string('location', 128)
      .notNullable()

      //location is the city
      tbl
        .string('venue', 255)
        .notNullable()

    tbl
      .string('hostedBy', 128)
      .notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};