const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Event_Content = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.event_content_multi_languages`,
    language: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.languages`, 'language_id', 'language_id');
    },
},
    {
        // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.event_content_multi_languages`, Event_Content);
