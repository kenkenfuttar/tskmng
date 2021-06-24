/**
 * @file log.js
 */

'use strict';

const log$ = require("jquery");

class log{
    dev = 'development';
    nodeEnv = log$('#nodeEnv').text().trim();
    constructor(){
        console.log(this.nodeEnv == this.dev);
    };

    log = (this.nodeEnv == this.dev) ? console.log.bind(console) : () => { };
}
module.exports.log = log;