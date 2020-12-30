const path = require('path');
const appDir = path.dirname(require.main.filename);
const { config } = require(appDir + '/configs');
const { Configuration } = require('./configurations/Configuration');
const data = require('./db');

const init = () => {
    console.log("Start application in `" + config.env + "` mode!");

    return data.bootUp()
    .then(function () {
      var app = Configuration.setup();

      return Promise.resolve(app);
    });
};

module.exports = {
    init,
}