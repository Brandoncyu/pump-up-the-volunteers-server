const table = 'organizations'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.text('password').notNullable()
        table.integer('ein').notNullable().unique()
        table.timestamps(true, true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(table)
};