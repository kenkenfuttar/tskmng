/**
 * @file index.js
 */
'use strict';


const $ = require('jquery');

/**
 * radioボタンの選択を取得
 * @return {string} radioボタンの選択結果
 */
const getCellId = () => {
    return $("input[name='heavyRadios']:checked").val();
};
getCellId;
exports.getCellId = getCellId;
