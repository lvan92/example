exports.up = function(knex, Promise){
    return knex.schema.alterTable('ultrasyncsportevents.category', function(table){
        table.foreign('category_id',['category_tribes_fkey']).references('tribes');
    });
}

exports.down = function(knex, Promise){
    return knex.schema.dropTable('ultrasyncsportevents.category');
}