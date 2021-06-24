/**
 * @file index.js
 */
'use strict';


const $ = require('jquery');

/**
 * @type {{text: string, id: number, cellId: string}}
 * @description タスク1つの内容
 */
const task = { 'text': '', 'id': '', 'cellId': '' };

/**
 * @type {number}
 * @description タスクのid管理
 */
let idNumber = 0;

/**
 * @type {Array<task>}
 * @description 画面内のタスクの配列
 */
const tasks = [];

/**
 * radioボタンの選択を取得
 * @return {string} radioボタンの選択結果
 */
const getCellId = () => {
    return $("input[name='heavyRadios']:checked").val();
};
getCellId;
exports.getCellId = getCellId;

/**
 * taskを作成、tasksに追加
 * @param {string} cellId radioボタンの選択
 */
const createTaskForId = (cellId) => {
    task.text = $('#addText').val();
    task.id = idNumber++;
    task.cellId = cellId;
    tasks.push(task);
};
createTaskForId;

/**
 * taskオブジェクトから新たなtaskオブジェクトを作成する
 * @param {{text: string, id: number, cellId: string}} item taskオブジェクト
 */
const createTaskForJSON = (item) => {
    task.text = item.text;
    task.id = idNumber++;
    task.cellId = item.cellId;
    tasks.push(task);
};
createTaskForJSON;

/**
 * taskをセルに追加する
 * @param {string} cellId radioボタンの選択
 */
const addTask = (cellId) => {
    // 新しいタグを作る
    $('<div>', {
        id: 'cellItem' + task.id,
        text: task.text,
        class: 'bg-warning rounded-lg p-2 m-1',
    }).appendTo('#' + cellId);
};
addTask;

/**
 * taskをsubmit用に隠し項目として追加する
 */
const addInput = () => {
    $('<input>', {
        id: 'inputItem' + task.id,
        name: 'inputItem',
        value: JSON.stringify(task),
        type: 'hidden',
    }).appendTo('#formIndex');
};
addInput;
