const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Event_Impact = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.event_impacts`,
    idAttribute: 'event_id',
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.event_impacts`, Event_Impact);