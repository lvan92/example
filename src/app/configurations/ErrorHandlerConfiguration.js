const config = require('../../../configs');
const ResponseSerializer = require('../utils/responseSerializer');

function init(app) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error('Request handler not found');
        err.status = 404;
        next(err);
    });

    // error handler
    switch (config.env) {
        case 'production':
            // production error handler
            // no stacktraces leaked to user
            app.use(function (err, req, res, next) {

                // Only handle to send error if the response hasn't been sent
                if(!res.headersSent) {
                    const status = err ? err.status : null;
                    const error = ResponseSerializer.createErrorResult(err, status);
                    res.status(error.meta.http_status).json(error);
                }
            });
            break;

        default:
            // will print stacktrace
            app.use(function (err, req, res, next) {

                // Only handle to send error if the response hasn't been sent
                if (!res.headersSent) {
                    const status = err ? err.status : null;
                    const error = ResponseSerializer.createErrorResult(err, status);
                    error.meta.stack = err.stack;
                    res.status(error.meta.http_status).json(error);
                }
            });
    }
}

module.exports.init = init;