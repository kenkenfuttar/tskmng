/**
 * @file log.js
 */

'use strict';
class consoleLog{
    constructor(nodeEnv) {
        this.nodeEnv = nodeEnv;
    };

    log = (nodeEnv == 'development') ? console.log.bind(console) : () => {};

    table = (nodeEnv == 'development') ? console.table.bind(console) : () => {};

};

module.exports = consoleLog;