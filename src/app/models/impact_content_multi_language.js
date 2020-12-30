const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Impact_Content = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.impact_content_multi_languages`,
    language: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.languages`, 'language_id', 'language_id');
    },
    category: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.category`, 'category_id', 'category_id');
    }
},

    {
        // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.impact_content_multi_languages`, Impact_Content);
