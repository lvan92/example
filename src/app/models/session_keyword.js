const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Session_Keyword = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.session_keywords`,
    idAttribute: 'session_keyword_id',

    session_keyword_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.session_keyword_content_multi_languages`, 'session_keyword_id', 'session_keyword_id');
    },
    session: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.sessions`, 'session_id', 'session_id');
    }
},
    {
        // Class (ie. static) functions and properties
        dependents: ['session_keyword_content']
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.session_keywords`, Session_Keyword);