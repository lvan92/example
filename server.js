const https = require('https');
const http = require('http');
const { config } = require('./configs');
const fs = require('fs');
const HTTPS = false;

const io = require('socket.io')
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const startServer = async (app) => {
  const server = http.createServer(app);
  const port = normalizePort(config.server.port);

  //require socket.io
  require('./src/app/socketio/socket')(io, server);

  server.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('(Process 11) Server started. Listening at host: ' + host + ' - port: ' + port);
  });


  /**
   * Event listener for HTTP server "error" event.
   */
  server.on('error', function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
}

module.exports = {
  startServer,
}