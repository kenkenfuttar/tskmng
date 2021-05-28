'use strict';

const $ = require("jquery");

const getOption = () => {
    const option = $('input[name="heavyRadios"]:checked').val();
    return option;
}
getOption;


$(() => {

    const taskObj = { text: "", id: "" };
    let idNumber = 0;
    const taskArray = [];

    $('#dropItem1').on('click', () => {

    });

    $('#btnAddTask').on('click', () => {
        // radioボタン値の取得
        const cellId = getCellId(getOption());
        // 追加タスクのjsonオブジェクトを作る
        createTaskObj();
        addTask(cellId);
        // submitのPOST内容に含めるために#formIndex内にinputのタグを作る
        addInput();
    });


    const getCellId = (option) => {
        let cellId = "";
        switch (option) {
            case "option1":
                cellId = "heavyAndUrgent";
                break;
            case "option2":
                cellId = "heavyAndUnurgent";
                break;
            case "option3":
                cellId = "unheavyAndUrgent";
                break;
            case "option4":
                cellId = "unheavyAndUnurgent";
                break;
        };
        return cellId;
    };

    const createTaskObj = () => {
        taskObj.text = $('#addText').val();
        taskObj.id = idNumber++;
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

    $('#btnSave').on('click', () => {
        $('#formIndex').submit();
    });
});