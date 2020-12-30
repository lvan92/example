const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Sponsor = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.sponsors`,
    sponsor_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.sponsor_content_multi_languages`, 'sponsor_id', 'sponsor_id');
    },
    video: function () {
        return this.hasMany(`${config.database.migrations.schemaName}.videos`, 'sponsor_id', 'sponsor_id');
    },
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.sponsors`, Sponsor);
