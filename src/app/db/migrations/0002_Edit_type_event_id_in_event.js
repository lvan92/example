exports.up = function(knex, Promise) {
    return knex.schema.table('utrasyncsportevents.events', function(table) {
        table.increments('event_id').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('utrasyncsportevents.events');
};