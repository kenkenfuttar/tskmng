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
    cellItemId;
    modalId;
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
        this.cellItemId = 'cellItem' + this.id;
        this.modalId = 'modal' + this.id;
    };

    /**
     * addModal
     */
    addModal() {
        const deleteCheck = 'deleteCheck';
        // bodyの直下にモーダル用のtemplateタグを作成する
        // $('#' + 'templateTarget').load('.\\dest\\modalTemplate.html');
        if ('content' in document.createElement('template')) {
            console.log('対応しているよ');
            const body = document.querySelector('body'),
                template = document.querySelector('#modalTemplate'),
                clone = template.content.cloneNode(true);

            body.prepend(clone);
            // 複製した内容の書き換え
            $('#' + 'modal' + 'n').attr('id', this.modalId);
            $('#' + deleteCheck).attr('id', deleteCheck + this.id);
            $('label .form-check-label').attr('for', deleteCheck + this.id);
            // TODO: もう少し効率よく書けそう
            switch (this.cellId) {
                case 'heavyAndUrgent':
                    break;
                case 'heavyAndUnurgent':
                    $('#' + this.modalId + ' ' + '.urgent')
                        .addClass('bg-white border border-danger text-dark');
                    break;
                case 'unheavyAndUrgent':
                    $('#' + this.modalId + ' ' + '.heavy')
                        .addClass('bg-white border border-warning');
                    break;
                case 'unheavyAndUnurgent':
                    $('#' + this.modalId + ' ' + '.urgent')
                        .addClass('bg-white border border-danger text-dark');
                    $('#' + this.modalId + ' ' + '.heavy')
                        .addClass('bg-white border border-warning');
                    break;
                default:
                    break;
            }
            $('#' + this.modalId + ' ' + 'form-control').val(this.text);
        } else {
            console.log('対応してないよ');
        }

        // check時にDeleteボタンが使えるようにする（checkしてないときは使えないようにする）
        $('body').on('change', '#' + deleteCheck + this.id, () => {
            const btnSelector = '#' + this.modalId + ' ' + '.btn-danger';
            console.log(btnSelector);
            if ($('#' + deleteCheck + this.id).prop('checked')) {
                $(btnSelector).removeAttr('disabled');
            } else {
                $(btnSelector).attr('disabled', 'disabled');
            };
        });

        // Deleteでデータを削除する
        $('body').on('click', '#' + this.modalId + ' ' + '.btnDelete', () => {
            // 一覧のデータを削除
            $('#' + this.cellItemId).remove();
            // modalのタグを削除
            $('#' + this.modalId).remove();
            // inputのタグを削除
            $('#' + 'inputItem' + this.id).remove();
        });

        // TODO: SaveChangesタスクの内容を書き換える

        // Close時未保存の内容があれば警告する
        $('body').on('click', '#' + this.modalId + ' ' + '.btnClose', () => {
            if ($('#' + this.modalId + ' ' + '.form-control')
                .val() != this.text) {
                if ('content' in document.createElement('template')) {
                    const
                        modalContent = document.querySelector(
                            '#' + this.modalId + ' .modal-content'),
                        template = document.querySelector('#alertTemplate'),
                        clone = template.content.cloneNode(true);

                    modalContent.prepend(clone);
                } else {
                    console.log('対応してないよ');
                }
                $('#' + this.modalId + ' ' + '.btnClose')
                    .attr('disabled', 'disabled');
                $('#' + this.modalId + ' ' + '.btnSave')
                    .attr('disabled', 'disabled');

                $('body').on('click', '#' + this.modalId + ' ' + '.alertClose',
                    () => {
                        $('#' + this.modalId + ' ' + '.btnClose')
                            .removeAttr('disabled');
                        $('#' + this.modalId + ' ' + '.btnSave')
                            .removeAttr('disabled');
                    });
            } else {
                $('#' + this.modalId)
                    .hide()
                    .removeClass('show')
                    .removeAttr('aria-modal', 'role');
                $('body').removeAttr('class');
                $('.modal-backdrop').remove();
            }
        });
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

    /**
     * @this Tasks
     */
    addTask() {
        const deleteCheck = 'deleteCheck';
        // 新しいタグを作る
        $('<div>', {
            'id': this.cellItemId,
            'text': this.text,
            'class': 'bg-warning rounded-lg p-2 m-1',
            // モーダルダイアログを出すための属性
            'data-toggle': 'modal',
            'data-target': '#' + this.modalId,
        }).appendTo('#' + this.cellId);

        this.addModal();
        this.addInput();

        // modalを開いたときは必ず非チェック状態とする
        $('#' + this.cellId).on('click', '#' + this.cellItemId, () => {
            $('#' + deleteCheck + this.id).prop('checked', false);
        });
    }
}
module.exports = Task;
