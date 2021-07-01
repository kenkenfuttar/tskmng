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
    };

    /**
     * @this Tasks
     */
    addTask() {
        // 新しいタグを作る
        $('<div>', {
            'id': 'cellItem' + this.id,
            'text': this.text,
            'class': 'bg-warning rounded-lg p-2 m-1',
            // モーダルダイアログを出すための属性
            'data-toggle': 'modal',
            'data-target': '#' + 'modal' + this.id,
        }).appendTo('#' + this.cellId);

        // $('#' + this.cellId).on('click', '#' + 'cellItem' + this.id, () => {
        //     alert('クリックしたよ');
        // });

        // bodyの直下にモーダル用のdivタグを作成する
        $('<div>', {
            id: 'modal' + this.id,
            class: 'modal',
            tabindex: '-1',
        }).prependTo('body');
        $('<div>', {
            class: 'modal-dialog',
        }).appendTo('#' + 'modal' + this.id);
        $('<div>', {
            class: 'modal-content',
        }).appendTo('#' + 'modal' + this.id + ' ' + '.' + 'modal-dialog');

        const modalContent = ['modal-header', 'modal-body', 'modal-footer'];
        modalContent.forEach((value) => {
            $('<div>', {
                class: value,
            }).appendTo('#' + 'modal' + this.id + ' ' + '.' + 'modal-content');
        });

        // modal-header
        $('<h5>', {
            class: 'modal-title',
            text: 'Modal title',
        }).appendTo('#' + 'modal' + this.id + ' ' + '.' + modalContent[0]);
        $('<button>', {
            'type': 'button',
            'class': 'close',
            'data-dismiss': 'modal',
            'aria-label': 'Close',
        }).appendTo('#' + 'modal' + this.id + ' ' + '.' + modalContent[0]);
        $('<span>', {
            'aria-hidden': 'true',
            'html': '&times;',
        }).appendTo('#' + 'modal' + this.id + ' ' + '.' + 'close');

        // modal-body
        $('<p>', {
            text: 'Modal body text goes here.',
        }).appendTo('#' + 'modal' + this.id + ' ' + '.' + modalContent[1]);

        // modal-footer
        $('<button>', {
            'type': 'button',
            'class': 'btn btn-secondary',
            'data-dismiss': 'modal',
            'text': 'Close',
        }).appendTo('#' + 'modal' + this.id + ' ' + '.' + modalContent[2]);
        $('<button>', {
            type: 'button',
            class: 'btn btn-primary',
            text: 'Save changes',
        }).appendTo('#' + 'modal' + this.id + ' ' + '.' + modalContent[2]);
    };

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
