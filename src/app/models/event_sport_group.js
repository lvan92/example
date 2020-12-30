const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Event_Sport_Group = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.event_sport_groups`,
    event_group_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.event_sport_group_content_multi_languages`, 'event_sport_group_id', 'event_sport_group_id');
    },
    event: function () {
        return this.hasMany(`${config.database.migrations.schemaName}.events`, 'event_sport_group_id', 'event_sport_group_id');
    },
},
    {
        // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.event_sport_groups`, Event_Sport_Group);