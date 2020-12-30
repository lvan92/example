const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Session = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.sessions`,
    idAttribute: 'session_id',
  
    session_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.session_content_multi_languages`, 'session_id', 'session_id');
    },
    session_keyword: function () {
        return this.hasMany(`${config.database.migrations.schemaName}.session_keywords`, 'session_id', 'session_id');
    },
    sponsor: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.sponsors`, 'sponsor_id', 'sponsor_id');
    },
    sound: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.sounds`, 'sound_id', 'sound_id');
    },
    impact: function () {
        return this.belongsToMany(`${config.database.migrations.schemaName}.impacts`, `${config.database.migrations.schemaName}.session_impacts`, 'session_id', 'impact_id').withPivot(['default_impact']);
    },
},
    {
        // Class (ie. static) functions and properties
        dependents: ['session_content', 'session_keyword', 'impact']
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.sessions`, Session);