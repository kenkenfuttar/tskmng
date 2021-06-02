'use strict';

const debugMode = (nodeEnv) => {
    return (nodeEnv == 'development') ? true : false;
};

const log = (logText, logFlg) => {
    logFlg&&console.log(logText);
};

const table = (logText, logFlg) => {
    logFlg&&console.table(logText);
};

module.exports = {debugMode, log, table};