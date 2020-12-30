const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Session_Impact = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.session_impacts`,
    idAttribute: 'session_id',
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.session_impacts`, Session_Impact);