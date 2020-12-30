exports.up = function(knex, Promise) {
    return knex.schema.table('utrasyncsportevents.users', function(table) {
        table.text('token');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('utrasyncsportevents.users');
};