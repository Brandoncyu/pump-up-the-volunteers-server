const table = 'volunteers'
exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable().defaultsTo('')
    table.string('email').notNullable().unique()
    table.text('password').notNullable()
    table.string('address_line1').notNullable()
    table.string('address_line2')
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.string('country').notNullable()
    table.integer('zip').notNullable().defaultsTo(0)
    table.boolean('Sunday').notNullable().defaultsTo(false)
    table.boolean('Monday').notNullable().defaultsTo(false)
    table.boolean('Tuesday').notNullable().defaultsTo(false)
    table.boolean('Wednesday').notNullable().defaultsTo(false)
    table.boolean('Thursday').notNullable().defaultsTo(false)
    table.boolean('Friday').notNullable().defaultsTo(false)
    table.boolean('Saturday').notNullable().defaultsTo(false)
    table.timestamps(true, true)
  })
};

exports.down = knex => {
  return knex.schema.dropTable(table)
};
