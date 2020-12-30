const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const User_Tribe = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.user_tribes`
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.user_tribes`, User_Tribe);