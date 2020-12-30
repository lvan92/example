const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Video = appBookshelf.Model.extend({

      // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.videos`,
    idAttribute: 'video_id',
    },
    {
      // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.videos`, Video);
