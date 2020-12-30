const appBookshelf = require('./app_bookshelf');
const { config } = require('../../../configs');

const Users = appBookshelf.Model.extend({

        // Instance methods and properties
        tableName: `${config.database.migrations.schemaName}.users`,
        idAttribute: 'user_id'
    },
    {
        // Class (ie. static) functions and properties
    });

module.exports = appBookshelf.model(`${config.database.migrations.schemaName}.users`, Users);
