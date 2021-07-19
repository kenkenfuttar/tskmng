/**
 * @file log.js
 */

'use strict';

const log$ = require('jquery');

const dev = 'development',
    nodeEnv = log$('#nodeEnv').text().trim();

/**
 * @class ログクラス
 * @description console.logをラップして開発モードでのみconsole.logを出力するようにする。
 */
class Log {
    /**
     * @constructor 空のコンストラクター
     */
    constructor() { };

    /**
     * @example <caption>{string}</caption>
        log(hogehoge)
     * @desc this.nodeEnv == this.devがfalseになる場合logは出力されない。
     */
    log = (nodeEnv == dev) ? console.log.bind(console) : () => { };
}
module.exports.Log = Log;
