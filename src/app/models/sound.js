const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Sound = appBookshelf.Model.extend({

  // Instance methods and properties
  tableName: `${config.database.migrations.schemaName}.sounds`,
  idAttribute: 'sound_id',
},
  {
    // Class (ie. static) functions and properties
  });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.sounds`, Sound);