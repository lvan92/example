"use strict";

const winston = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, printf } = winston.format;
const contextService = require('request-context');

const transport = new (winston.transports.DailyRotateFile)({
    filename: './logs/%DATE%-EventModule.log',
    datePattern: 'YYYY-MM-DD'
});

const customFormat = printf(({ level, message, timestamp, requestIdFormat }) => {
    const requestId = contextService.get('request:requestId');
    requestIdFormat = requestId ? requestId : ''
    return `{"timestamp":[${timestamp}],"level":[${level}], [${requestIdFormat}], "message":${message}}`;
});

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS'
        }),
        customFormat
    ),
    transports: [
        transport
    ]
});

module.exports = {
    logger
}