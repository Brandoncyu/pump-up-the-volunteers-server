const table = 'events'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('title').notNullable()
        table.text('description').notNullable()
        table.date('date').notNullable()
        table.string('street')
        table.string('city')
        table.string('state')
        table.string('zip')
        table.boolean('Sunday').notNullable().defaultsTo(false)
        table.boolean('Monday').notNullable().defaultsTo(false)
        table.boolean('Tuesday').notNullable().defaultsTo(false)
        table.boolean('Wednesday').notNullable().defaultsTo(false)
        table.boolean('Thursday').notNullable().defaultsTo(false)
        table.boolean('Friday').notNullable().defaultsTo(false)
        table.boolean('Saturday').notNullable().defaultsTo(false)
        table.integer('org_id').notNullable().defaultsTo(0)
        table.foreign('org_id').references('organizations.id').onDelete('CASCADE')
        table.timestamps(true, true)
    })
};

exports.down = knex => {
    return knex.schema.dropTable(table)
};