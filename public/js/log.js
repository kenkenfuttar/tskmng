/**
 * @file log.js
 */

'use strict';
/**
 * package.jsonで設定されるNODE_ENVよりbool値を返す
 * @param {string} nodeEnv package.jsonで設定されるNODE_ENV
 * @returns {boolean} developmentの場合true
 */
const debugMode = (nodeEnv) => {
    return (nodeEnv == 'development') ? true : false;
};

/**
 * コンソールにログを表示する
 * @param {string} logText コンソールログ表示テキスト
 * @param {boolean} logFlg trueの場合、ログを表示する。
 */
const log = (logText, logFlg) => {
    logFlg && console.log(logText);
};

const table = (logText, logFlg) => {
    logFlg && console.table(logText);
};

module.exports = { debugMode, log, table };