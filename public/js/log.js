/**
 * @file log.js
 */

'use strict';
var nodeEnv;

const setNodeEnv = (pEnv) => {
    nodeEnv = pEnv;
    console.log(nodeEnv);
}

const log = (text) => {
    if (nodeEnv == 'development') {
        console.log.bind(console.log(text));
    } else {
        console.log(nodeEnv == 'development');
    }
}

const table = (nodeEnv == 'development') ? console.table.bind(console) : () => { };

module.exports = { setNodeEnv, log, table };