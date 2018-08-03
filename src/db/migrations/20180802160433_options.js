const table = 'options'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('categoryId').notNullable()
        table.string('name').notNullable()
    })
};

exports.down = knex => {
    return knex.schema.dropTable(table)
};