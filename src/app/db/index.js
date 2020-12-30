'use strict'

const Promise = require('bluebird');

const { config } = require('../../../configs');
const  knex  = require('./connection');

function bootUp() {
    console.log("(Process 1) Running migrations...");
    return knex.migrate.latest(config.database.migrations)
        .then(function () {
            console.log("(Process 2) Initializing models...");

            // Trigger exports for all models on app load.
            // Then they will be catched in app life cycle.
            require('../models');

            return Promise.resolve();
        });
}

module.exports = {
    bootUp,
}