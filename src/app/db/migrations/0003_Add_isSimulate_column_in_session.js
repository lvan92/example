exports.up = function(knex, Promise) {
    return knex.schema.table('ultrasyncsportevents.sessions', function(table) {
        table.boolean('isSimulate');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ultrasyncsportevents.sessions');
};