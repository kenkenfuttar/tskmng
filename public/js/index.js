/**
 * @file index.js
 */
'use strict';


const $ = require("jquery");

const consoleLog = require("./log.js");

/**
 * @description タスク1つの内容
 */
const task = { text: "", id: "", option: "" };

/**
 * @description タスクのid管理
 */
let idNumber = 0;

/**
 * @description 画面内のタスク
 */
const tasks = [];

// ログモード設定
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
const createTask = (cellId) => {
    task.text = $('#addText').val();
    task.id = idNumber++;
    task.option = cellId;
    tasks.push(task);
};

/**
 * taskをセルに追加する
 * @param {string} cellId radioボタンの選択
 */
const addTask = (cellId) => {
    // 新しいタグを作る
    $("<div>", {
        id: 'cellItem' + task.id,
        text: task.text,
        class: 'bg-warning rounded-lg p-2'
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

$(() => {

    // ログファイル設定
    logFlg = consoleLog.debugMode($('#nodeEnv').text());
    consoleLog.log('log', logFlg);

    $('#dropItem1').on('click', () => {

    });

    $('#btnAddTask').on('click', () => {
        // radioボタン値の取得
        const cellId = getCellId();
        console.log(cellId);
        // 追加タスクのjsonオブジェクトを作る
        createTask(cellId);
        addTask(cellId);
        // submitのPOST内容に含めるために#formIndex内にinputのタグを作る
        addInput();
    });

    $('#btnSave').on('click', () => {
        $('#formIndex').trigger('submit');
    });
});