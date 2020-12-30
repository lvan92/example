require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Routes = require('../routes');
const { logger } = require('./logger');
const { v4 } = require('uuid');
const contextService = require('request-context');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const { config } = require(appDir + '/configs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../constants/swagger.json');
const TempDirConfiguration = require('./TempDirConfiguration');
const LoggerConfiguration = require('./LoggerConfiguration');
const passport = require('passport');
const strategy = require('../authorization/auth');
const ErrorHandlerConfiguration = require('./ErrorHandlerConfiguration');

class Configuration {

    static setup = () => {
        const app = express();

        console.log('(Process 3) Configuring express...');
        Configuration.setUpExpress(app);
        console.log('(Process 4) Configuring Creating request logger...');
        Configuration.setupRequestLogger(app);
        console.log('(Process 5) Configuring routing...');
        Configuration.setUpRouting(app);
        console.log('(Process 6) Configuring Creating error logger...');
        Configuration.setUpErrorLogger(app);
        console.log('(Process 7) Configuring swagger...');
        Configuration.setUpSwagger(app);
        console.log('(Process 8) Configuring Creating `tmp` directory...');
        Configuration.createTempDirectory();
        console.log('(Process 9) Configuring authentication...');
        Configuration.setUpAuthentication(app);
        console.log('(Process 10) Configuring error handler...');
        Configuration.setUpErrorHandler(app);
        
        return app;
    };

    static setUpExpress = (app) => {
        const maxAgeOptionRequest = 86400; // 24h cached for pre-flight request

        app.use(cors({ maxAge: maxAgeOptionRequest }));
        app.options('*', cors({ maxAge: maxAgeOptionRequest }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ limit: config.importing.file.maxsize, extended: true }));
        app.use(contextService.middleware('request'))
        app.use((req, res, next) => {
            const requestId = v4();
            contextService.set('request:requestId', requestId);
            logger.info("Start API: " + req.method + req.originalUrl + ", params: " + JSON.stringify(req.params));
            next();
        });
    };

    static setUpRouting = (app) => {
        Routes.init(app);
    };

    static setUpSwagger = (app) => {
        app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    };

    static createTempDirectory = () => {
        TempDirConfiguration.initTempDir();
    };

    static setupRequestLogger = (app) => {
        LoggerConfiguration.initRequestLogger(app);
    };

    static setUpErrorLogger = (app) => {
        LoggerConfiguration.initErrorLogger(app);
    };

    static setUpAuthentication = (app) => {
        app.use(passport.initialize({}));
        passport.use(strategy);
    }

    static setUpErrorHandler =(app) => {
        ErrorHandlerConfiguration.init(app);
    }
   
}

module.exports = {
    Configuration,
};