exports.up = function(knex, Promise){
    return knex.schema.table('ultrasyncsportevents.tribes', function(table){
        table.integer('category_id');
    });
}

exports.down = function(knex, Promise){
    return knex.schema.dropTable('ultrasyncsportevents.tribes');
}