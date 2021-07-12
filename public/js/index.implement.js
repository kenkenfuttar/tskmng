/**
 * @file index.js
 */
'use strict';


const $ = require('jquery');

/**
 * radioボタンの選択を取得
 * @return {{heavy: boolean, urgent: boolean}} radioボタンの選択結果
 */
const getCellId = () => {
    // return $("input[name='heavyRadios']:checked").val();
    const check = $("input[name='heavyRadios']:checked").val();
    let heavy = true,
        urgent = true;
    switch (check) {
        case 'heavyAndUrgent':
            break;
        case 'heavyAndUnurgent':
            urgent = false;
            break;
        case 'unheavyAndUrgent':
            heavy = false;
            break;
        case 'unheavyAndUnurgent':
            heavy = false;
            urgent = false;
            break;
        default:
            break;
    }
    return { heavy: heavy, urgent: urgent };
};
getCellId;
exports.getCellId = getCellId;
