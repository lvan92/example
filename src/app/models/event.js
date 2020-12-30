const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Event = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.events`,
    idAttribute: 'event_id',
    event_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.event_content_multi_languages`, 'event_id', 'event_id');
    },
    tribe: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.tribes`, 'tribe_id', 'tribe_id');
    },
    opponent_tribe: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.tribes`, 'tribe_id', 'opponent_tribe_id');
    },
    tribe_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.tribe_content_multi_languages`, 'tribe_id', 'tribe_id');
    },
    opponent_tribe_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.tribe_content_multi_languages`, 'tribe_id', 'opponent_tribe_id');
    },
    event_group_content: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.event_sport_group_content_multi_languages`, 'event_sport_group_id', 'event_sport_group_id');
    },
    country_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.event_country`, 'event_id', 'event_id');
    },
    session: function () {
        return this.hasMany(`${config.database.migrations.schemaName}.sessions`, 'event_id', 'event_id');
    },
},
    {
        // Class (ie. static) functions and properties
        dependents: ['event_content', 'country_content', 'session']
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.events`, Event);
