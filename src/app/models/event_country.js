const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Event_Country = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.event_country`,
    country: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.country`, 'country_id', 'country_id');
    }
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.event_country`, Event_Country);
