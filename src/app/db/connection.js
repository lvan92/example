'use strict'

const { config } = require('../../../configs');

const knex = require('knex');
const knexInstance = knex(config.database);


module.exports = knexInstance;