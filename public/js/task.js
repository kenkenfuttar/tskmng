/**
 * @file task.js
 */
'use strict';
/**
 * @class Task
 */
class Task {
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
}
module.exports = Task;
