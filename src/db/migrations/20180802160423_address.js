const table = 'address'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('address_line1').notNullable()
        table.string('address_line2').notNullable()
        table.string('city').notNullable()
        table.string('state').notNullable()
        table.string('country').notNullable()
        table.integer('zip').notNullable().defaultsTo(0)

        // foreign key 
        table.integer('user_id').notNullable().defaultsTo(0)
        table.foreign('user_id').references('volunteers.id').onDelete('CASCADE')
    })
};

exports.down = knex => {
    return knex.schema.dropTable(table)
};