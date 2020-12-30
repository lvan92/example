const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Session_Content = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.session_content_multi_languages`,
    session: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.sessions`, 'session_id', 'session_id');
    },
    language: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.languages`, 'language_id', 'language_id');
    },
},
    {
        // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.session_content_multi_languages`, Session_Content);