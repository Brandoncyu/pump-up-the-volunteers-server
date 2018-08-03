exports.up = knex => {
    return knex.schema.createTable('options', table => {
        // What is table.increments()? create id
        table.increments()
        table.string('name').notNullable()
    })
};

exports.down = knex => {
    return knex.schema.dropTable('options')
};