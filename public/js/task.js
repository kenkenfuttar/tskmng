/**
 * @file task.js
 */
'use strict';
const $ = require('jquery');
/**
 * @class Task
 */
class Task {
    task = {};
    /**
     * Taskコンストラクター
     * @param {string} text タスクの表示内容
     * @param {number} id 管理用ID
     * @param {string} cellId 表示場所のID
     */
    constructor(text, id, cellId) {
        this.text = text;
        this.id = id;
        this.cellId = cellId;
        this.task.text = this.text;
        this.task.id = this.id;
        this.task.cellId = this.cellId;
    }

    /**
     * @this Tasks
     */
    addTask() {
        // 新しいタグを作る
        $('<div>', {
            id: 'cellItem' + this.id,
            text: this.text,
            class: 'bg-warning rounded-lg p-2 m-1',
        }).appendTo('#' + this.cellId);
    }

    /**
     * taskをsubmit用に隠し項目として追加する
     */
    addInput() {
        console.table(this.task);
        console.log(this.task);

        console.log(JSON.stringify(this.task));
        $('<input>', {
            id: 'inputItem' + this.id,
            name: 'inputItem',
            value: JSON.stringify(this.task),
            type: 'hidden',
        }).appendTo('#formIndex');
    };
}
module.exports = Task;
