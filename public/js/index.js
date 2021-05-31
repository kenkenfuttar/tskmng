'use strict';

const $ = require("jquery");

const taskObj = { text: "", id: "" , option: ""};
let idNumber = 0;
const taskArray = [];

const getCellId = () => {
    return $("input[name='heavyRadios']:checked").val();
};

const createTaskObj = (cellId) => {
    taskObj.text = $('#addText').val();
    taskObj.id = idNumber++;
    taskObj.option = cellId;
    taskArray.push(taskObj);
};

const addTask = (cellId) => {
    // 新しいタグを作る
    $("<div>", {
        id: 'cellItem' + taskObj.id,
        text: taskObj.text,
        class: 'bg-warning rounded-lg p-2'
    }).appendTo('#' + cellId);
};

const addInput = () => {
    $("<input>", {
        id: 'inputItem' + taskObj.id,
        name: 'inputItem',
        value: JSON.stringify(taskObj),
        type: 'hidden'
    }).appendTo('#formIndex');
};

$(() => {

    $('#dropItem1').on('click', () => {

    });

    $('#btnAddTask').on('click', () => {
        // radioボタン値の取得
        const cellId = getCellId();
        console.log(cellId);
        // 追加タスクのjsonオブジェクトを作る
        createTaskObj(cellId);
        addTask(cellId);
        // submitのPOST内容に含めるために#formIndex内にinputのタグを作る
        addInput();
    });

    $('#btnSave').on('click', () => {
        $('#formIndex').trigger('submit');
    });
});