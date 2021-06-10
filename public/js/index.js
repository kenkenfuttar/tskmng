/**
 * @file index.js
 */
'use strict';


const $ = require("jquery");

const consoleLog = require("./log.js");

/**
 * @type {{text: string, id: number, cellId: string}}
 * @description タスク1つの内容
 */
let task = { "text": "", "id": "", "cellId": "" };

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

// ログモード設定
/**
 * @type {boolean}
 * @description package.jsonで設定されるNODE_ENVを判断してbool値にしたもの
 */
let logFlg = "";

/**
 * radioボタンの選択を取得
 * @returns {string} radioボタンの選択結果
 */
const getCellId = () => {
    return $("input[name='heavyRadios']:checked").val();
};

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

/**
 * taskオブジェクトから新たなtaskオブジェクトを作成する
 * @param {{text: string, id: number, cellId: string}} item taskオブジェクト
 */
const createTaskForJSON = (item) => {
    task.text = item.text;
    task.id = idNumber++;
    task.cellId = item.cellId;
    tasks.push(task);
}

/**
 * taskをセルに追加する
 * @param {string} cellId radioボタンの選択
 */
const addTask = (cellId) => {
    // 新しいタグを作る
    $("<div>", {
        id: 'cellItem' + task.id,
        text: task.text,
        class: 'bg-warning rounded-lg p-2 m-1'
    }).appendTo('#' + cellId);
};

/**
 * taskをsubmit用に隠し項目として追加する
 */
const addInput = () => {
    $("<input>", {
        id: 'inputItem' + task.id,
        name: 'inputItem',
        value: JSON.stringify(task),
        type: 'hidden'
    }).appendTo('#formIndex');
};

export var indexReady = $(() => {

    // ログファイル設定
    logFlg = consoleLog.debugMode($('#nodeEnv').text());
    consoleLog.log('log', logFlg);

    // ファイルから読み取った内容をセルに設定する
    consoleLog.log("text :" + $('#items').text().toString(), logFlg);
    const items = JSON.parse($('#items').text());

    consoleLog.log("itemslength :" + items.length, logFlg);
    if (!items[0]) {

    } else {
        items.forEach((item) => {
            consoleLog.log("item:" + item, logFlg);
            task = JSON.parse(item);
            consoleLog.log("task.text:" + task.text, logFlg);
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
        const cellId = getCellId();
        console.log(cellId);
        // 追加タスクのjsonオブジェクトを作る
        createTaskForId(cellId);
        addTask(cellId);
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