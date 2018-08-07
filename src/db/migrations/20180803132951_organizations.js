const table = 'organizations'
exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.text('password').notNullable()
    table.integer('ein').notNullable().unique()
    table.string('description').notNullable()
    table.string('logo').notNullable()
    table.string('street')
    table.string('city')
    table.string('state')
    table.string('zip')
    table.string('latitude')
    table.string('longtitude')
    table.integer('option_id').notNullable().defaultsTo(0)
    table.foreign('option_id').references('options.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(table)
};
