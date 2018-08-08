const table = 'volunteers_events'
exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.integer('vol_id').notNullable().defaultsTo(0)
        table.integer('event_id').notNullable().defaultsTo(0)
        table.integer('status').notNullable().defaultsTo(1)
        table.foreign('vol_id').references('volunteers.id').onDelete('CASCADE')
        table.foreign('event_id').references('events.id').onDelete('CASCADE')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(table)
};