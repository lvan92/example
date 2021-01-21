const fs = require('fs');

module.exports = {
    database: {
        client: "postgres",
        connection: {
            host: "localhost",
            port: 5432,
            database: "test",
            user: "postgres",
            password: "ngaikhiem123",
        },
        migrations: {
            tableName: 'knex_migrations',
            schemaName: "ultrasyncsportevents",
            directory: './src/app/db/migrations'
        }
    }
}