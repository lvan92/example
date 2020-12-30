const app = require('./src/app');
const { startServer } = require('./server');

app.init()
    .then((appInstance) => {
        startServer(appInstance);
    });