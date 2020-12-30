const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Impact = appBookshelf.Model.extend({

    // Instance methods and properties
    tableName: `${config.database.migrations.schemaName}.impacts`,
    idAttribute: 'impact_id',
    impact_content: function () {
        return this.hasOne(`${config.database.migrations.schemaName}.impact_content_multi_languages`, 'impact_id', 'impact_id');
    },
    country: function () {
        return this.belongsTo(`${config.database.migrations.schemaName}.country`, 'country_id', 'country_id');
    },
},
    {
        // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.impacts`, Impact);