const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Category = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.category`
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.category`, Category);
