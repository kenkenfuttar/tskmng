/**
 * @file index.js
 */
'use strict';


const $ = require('jquery');

const Clog = require('./log.js').Log;

const index = require('./index.implement.js');

const Task = require('./task.js');

/**
 * @type {{text: string, id: number, cellId: string}}
 * @description タスク1つの内容
 */
let task = { text: '', id: '', cellId: '' };

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

// /**
//  * taskを作成、tasksに追加
//  * @param {string} cellId radioボタンの選択
//  */
// const createTaskForId = (cellId) => {
//     task.text = $('#addText').val();
//     task.id = idNumber++;
//     task.cellId = cellId;
//     const objTask = new Task(task.text, task.id, task.cellId);
//     console.log(objTask);
//     // tasks.push(task);
//     tasks.push(objTask);
// };

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

$(() => {
    // ログファイル設定
    const log = new Clog();
    console.log('console.log');
    log.log('consoleLog.log');

    // ファイルから読み取った内容をセルに設定する
    const items = JSON.parse($('#items').text());

    if (!items[0]) {

    } else {
        items.forEach((item) => {
            log.log('item:' + item);
            task = JSON.parse(item);
            log.log('task.text:' + task.text);
            createTaskForJSON(task);
            addTask(task.cellId);
            addInput();
        });
    }

    /**
     * タスク追加ボタンクリックイベント
     */
    $('#btnAddTask').on('click', () => {
        // radioボタン値の取得
        const cellId = index.getCellId();
        log.log(cellId);
        // 追加タスクのjsonオブジェクトを作る
        // createTaskForId(cellId);
        const task = new Task($('#addText').val(), idNumber++, cellId);
        // addTask(cellId);
        task.addTask();
        // submitのPOST内容に含めるために#formIndex内にinputのタグを作る
        addInput();
    });

    /**
     * ファイル保存ボタンクリックイベント
     */
    $('#btnSave').on('click', () => {
        $('#formIndex').trigger('submit');
    });
});
