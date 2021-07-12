/**
 * @file index.js
 */
'use strict';


const $ = require('jquery'),
    Clog = require('./log.js').Log,
    index = require('./index.implement.js'),
    Task = require('./task.js');


let
    /**
     * @type {{text: string,
           id: number,
           cellId: { heavy: boolean, urgent: boolean }}}
     * @description タスク1つの内容
     */
    objTask = { text: '', id: '', cellId: { heavy: '', urgent: '' } },
    /**
     * @type {number}
     * @description タスクのid管理
     */
    idNumber = 0;

/**
 * @type {Array<task>}
 * @description 画面内のタスクの配列
 */
const tasks = [];

$(() => {
    // ログファイル設定
    const log = new Clog();
    console.log('console.log');
    log.log('consoleLog.log');

    // ファイルから読み取った内容をセルに設定する
    const items = JSON.parse($('#items').text());

    if (!items[0]) {
        log.log('記録タスクは0件です');
    } else {
        items.forEach((item) => {
            log.log('item:' + item);
            objTask = JSON.parse(item);
            const task = new Task(objTask.text, idNumber++, objTask.cellId);
            log.log('task.text:' + task.text);
            task.addTask();
            tasks.push(task);
        });
    }

    /**
     * タスク追加ボタンクリックイベント
     */
    $('#btnAddTask').on('click', () => {
        // radioボタン値の取得
        const cellId = index.getCellId(),
            // 追加タスクのjsonオブジェクトを作る
            task = new Task($('#addText').val(), idNumber++, cellId);
        log.log(cellId);
        task.addTask();
        // submitのPOST内容に含めるために#formIndex内にinputのタグを作る
        tasks.push(task);
    });

    /**
     * ファイル保存ボタンクリックイベント
     */
    $('#btnSave').on('click', () => {
        $('#formIndex').trigger('submit');
    });
});
