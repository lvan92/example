const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const appDir = path.dirname(require.main.filename);
const { config } = require(appDir + '/configs');
const logDir = appDir + config.tempDirPath + config.logging.path;

const flatten = require('flat');
const unflatten = require('flat').unflatten;
const _ = require('lodash');

const getFileTransport = (config, filename) => {
    const fileLogConfig = config.logging.file;

    const transport = new winston.transports.File({
        filename: filename,
        maxsize: fileLogConfig.maxsize,
        maxFiles: fileLogConfig.maxFiles,
        tailable: fileLogConfig.tailable,
        zippedArchive: fileLogConfig.zippedArchive
    });

    return transport;
};

// For development only
const getConsoleTransport = () => {
    const transport = new winston.transports.Console({
        colorize: true,
        timestamp: true,
        humanReadableUnhandledException: true
    });

    return transport;
};

// =============SETUP LOGGERS===================================
// See `express-winston` document for options to setup loggers
//  https://github.com/bithavoc/express-winston
// =============================================================

// Request whitelist
const DEFAULT_REQ_WHITELIST = ['url', 'headers', 'method',
    'httpVersion', 'originalUrl', 'query', 'body'];

// Response whitelist
const DEFAULT_RES_WHITELIST = ['statusCode', 'body'];

const REQ_HEADER_BLACKLIST = ['authorization', 'signature'];

const REQ_BODY_BLACKLIST = ['password', 'token', 'secret'];

const RES_BODY_BLACKLIST = ['password', 'token', 'secret'];

const initRequestLogger = (app) => {
    if (config.logging) {
        if (config.env === 'dev') {                    
            app.use(expressWinston.logger({
                transports: [
                    getConsoleTransport()
                ],
                statusLevels: true,
                expressFormat: true,
                colorize: true,
                requestWhitelist: ['method', 'originalUrl'],
                responseWhitelist: ['statusCode']
            }));
        }

        const filename = logDir + '/' + config.env + '.request.log';        
        app.use(expressWinston.logger({
            transports: [
                getFileTransport(config, filename)
            ],
            statusLevels: true,
            requestFilter: customRequestFilter,
            responseFilter: customResponseFilter,
            requestWhitelist: DEFAULT_REQ_WHITELIST,

            // All requests information is wrapped inside of `data` and `meta`
            //  so that we need to tell logger the whitelist for request body
            bodyWhitelist: ['data', 'meta'],

            responseWhitelist: DEFAULT_RES_WHITELIST
        }));
    }
};

const initErrorLogger = (app) => {
    if (config.logging) {
      var filename = logDir + '/' + config.env + '.error.log';
  
      app.use(expressWinston.errorLogger({
        transports: [
          getFileTransport(config, filename)
        ],
        statusLevels: true,
        requestFilter: customRequestFilter,
        requestWhitelist: DEFAULT_REQ_WHITELIST,
      }));
    }
  }

const customRequestFilter = (req, propName) => {
    switch (propName) {
        case 'headers':
            return requestHeaderFilter(req.headers);

        // For req.body in `expressWinston.errorLogger`
        //  Workaround code because of problem in `express-winston`
        case 'body':
            return requestBodyFilter(req.body);

        // For req.body in normal loggers
        //  Workaround code because of problem in `express-winston`
        // `req` param is actual req.body
        case 'data':
            return requestBodyFilter(req.data);

        // For req.body in normal loggers
        //  Workaround code because of problem in `express-winston`
        // `req` param is actual req.body
        case 'meta':
            return requestBodyFilter(req.meta);

        default:
            return req[propName];
    }
};

const requestHeaderFilter = (reqHeaders) => {
    const header = maskBlackListValues(reqHeaders, REQ_HEADER_BLACKLIST);

    return header;
};

const requestBodyFilter = (reqBody) => {
    const body = maskBlackListValues(reqBody, REQ_BODY_BLACKLIST);

    return body;
};

const maskBlackListValues = (obj, blacklistedWords) => {
    if (!obj) {
        return;
    }

    if (typeof obj === 'string') {
        return obj;
    }

    // Return an object one level deep,
    //  regardless of how nested the original object was.
    // See more: https://www.npmjs.com/package/flat#flattenoriginal-options
    const flattenObj = flatten(obj);

    _.forEach(blacklistedWords, function (blackListedWord) {

        // Find all field names that contains the blacklist keyword
        const blacklistedFields = _.filter(_.keys(flattenObj), function (key) {
            return _.includes(key, blackListedWord);
        });

        // Mask value of each blacklistedField
        _.forEach(blacklistedFields, function (fieldName) {
            const maskedValue = maskValue(flattenObj[fieldName]);

            flattenObj[fieldName] = maskedValue;
        });
    });

    // See https://www.npmjs.com/package/flat#unflattenoriginal-options
    const unflattenObj = unflatten(flattenObj);

    return unflattenObj;
};

const customResponseFilter = (res, propName) => {
    switch (propName) {
        case 'body':
            return responseBodyFilter(res.body);

        default:
            return res[propName];
    }
};

const responseBodyFilter = (resBody) => {
    const body = maskBlackListValues(resBody, RES_BODY_BLACKLIST);

    return body;
};

const maskValue = (value) => {
    if (_.isString(value)) {
        return maskString(value);
    }
    else {
        const toStringValue = _.toString(value);

        return toStringValue ? maskString(value) : '';
    }
}

// Mask a string by replacing each char of a word with '*'
const maskString = (str) => {
    const words = _.split(str, ' ');

    const maskedWords = _.map(words, function (word) {
        return _.replace(word, /./g, '*');
    });

    return _.join(maskedWords, ' ');
};

const writeLog = (content, request) => {
    const filename = logDir + '/' + config.env + '.' + request + '.log';
    winston = null;
    winston = require('winston');

    const transport = getFileTransport(config, filename);
    transport.timestamp = false;

    const logger = new winston.Logger({
        transports: [transport]
    });

    logger.info(content);
    if (logger) {
        logger.close();
    }
};

module.exports = {
    writeLog,
    initRequestLogger,
    initErrorLogger,
}

