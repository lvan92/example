const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Tribe = appBookshelf.Model.extend({

  // Instance methods and properties
  tableName: `${config.database.migrations.schemaName}.tribes`,
  idAttribute: 'tribe_id',
  tribe_content: function () {
    return this.hasOne(`${config.database.migrations.schemaName}.tribe_content_multi_languages`, 'tribe_id', 'tribe_id');
  },
  event_as_home: function () {
    return this.hasMany(`${config.database.migrations.schemaName}.events`, 'tribe_id', 'tribe_id');
  },
  event_as_guess: function () {
    return this.hasMany(`${config.database.migrations.schemaName}.events`, 'opponent_tribe_id', 'tribe_id');
  },
  user: function () {
    return this.belongsToMany(`${config.database.migrations.schemaName}.users`, `${config.database.migrations.schemaName}.user_tribes`, 'user_id', 'tribe_id');
  },
  category: function () {
    return this.belongsTo(`${config.database.migrations.schemaName}.category`, 'category_id', 'category_id');
  }
},
  {
    dependents: ["tribe_content"]
  });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.tribes`, Tribe);