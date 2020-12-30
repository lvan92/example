const path = require('path');
const fs = require('fs');

const appDir = path.dirname(require.main.filename);
const { config } = require(appDir + '/configs');

const initTempDir = () => {
    let tmpDir = appDir + config.tempDirPath;

    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }

    initLogDir();
}

const initLogDir = () => {
    if (config.logging) {
        let logDir = appDir + config.tempDirPath + config.logging.path;

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
    }
}

module.exports  = {
    initTempDir,
}