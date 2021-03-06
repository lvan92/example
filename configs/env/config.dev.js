const fs = require('fs');

module.exports = {
    database: {
        client: "postgres",
        connection: {
            host: "ultrasyncsportevent.postgres.database.azure.com",
            port: 5432,
            database: "SportEvents",
            user: "ultrasyncadministrator@ultrasyncsportevent",
            password: "ultrasync12345678x@X",
            ssl : {
                ca: fs.readFileSync('./ca.crt.pem'),
            },
        },
        migrations: {
            tableName: 'knex_migrations',
            schemaName: "ultrasyncsportevents",
            directory: './src/app/db/migrations'
          }
    }
}