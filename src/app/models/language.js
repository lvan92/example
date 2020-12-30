const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Language = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.languages`,    
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.languages`, Language);