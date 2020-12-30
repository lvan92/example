require('dotenv').config();

let env = process.env.NODE_ENV || 'dev';
console.log("NODE_ENV:"+ env);
const config = Object.assign({ env: env }, require('./config.default'),  require('../configs/env/config.' + env));

module.exports = {
    config,
};