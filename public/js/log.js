var debugMode = (nodeEnv) => {
    return (nodeEnv == 'development') ? true : false;
};

var log = (logText, logFlg) => {
    logFlg&&console.log(logText);
};

module.exports = {debugMode, log};