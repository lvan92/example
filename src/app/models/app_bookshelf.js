const bookshelf = require('bookshelf');
const cascadeDelete = require('bookshelf-cascade-delete');

const knex = require('../db/connection');

const appBookshelf = bookshelf(knex);

// Load the Bookshelf registry plugin, which helps us avoid circular dependencies
appBookshelf.plugin('registry');

appBookshelf.plugin(cascadeDelete);

// ## appBookshelf.Model
// The BaseModel which other models will inherit from
appBookshelf.Model = appBookshelf.Model.extend({
  //hasTimestamps: ['createdAt', 'updatedAt'],
},
{
  // Class (ie. static) functions and properties
});

module.exports = appBookshelf;