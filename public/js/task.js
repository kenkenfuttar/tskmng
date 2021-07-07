/**
 * @file task.js
 */
'use strict';
const $ = require('jquery');

const deleteCheck = 'deleteCheck',
    $body = $('body');

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
     * modalを閉じる処理
     */
    closeModal() {
        $('#' + this.modalId).hide();
        const removeObj =
            // 背景
            '.modal-backdrop' + ',' +
            // Alerts
            '#' + this.modalId + ' ' + '.modal-alert';
        $(removeObj).remove();
    }

    /**
     * Deleteボタンを無効・有効化する
     */
    disabledDelete() {
        const $btnDelete = $('#' + this.modalId + ' ' + '.btnDelete');
        if ($('#' + deleteCheck + this.id).prop('checked')) {
            $btnDelete.removeAttr('disabled');
        } else {
            $btnDelete.attr('disabled', 'disabled');
        };
    }

    /**
     * ボタン群を有効化する
     * @param {string} $attrObj 有効化するオブジェクト
     */
    disabledBtnArea($attrObj) {
        $attrObj.removeAttr('disabled');
        this.disabledDelete();
    }

    /**
     * addModal
     */
    addModal() {
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
            $('#' + this.modalId + ' ' + '.form-control').val(this.text);
        } else {
            console.log('対応してないよ');
        }

        // check時にDeleteボタンが使えるようにする（checkしてないときは使えないようにする）
        $body.on('change', '#' + deleteCheck + this.id, () => {
            this.disabledDelete();
        });

        // Deleteでデータを削除する
        $body.on('click', '#' + this.modalId + ' ' + '.btnDelete', () => {
            const $removeObj = $(
                // 一覧のタグ
                '#' + this.cellItemId + ',' +
                // modalのタグ
                '#' + this.modalId + ',' +
                // inputのタグ
                '#' + 'inputItem' + this.id + ',' +
                // 背景のタグ
                '.modal-backdrop',
            );
            $removeObj.remove();
        });

        // SaveChangesタスクの内容を書き換える
        $body.on('click', '#' + this.modalId + ' ' + '.btnSave', () => {
            this.text = $('#' + this.modalId + ' ' + '.form-control').val();
            this.task.text = this.text;
            $('#' + this.cellItemId).text(this.text);
            $('#' + 'inputItem' + this.id).val(JSON.stringify(this.task));
            $('.modal-alert-success').fadeIn(1000).delay(2000).fadeOut(2000);
        });

        // Close時未保存の内容があれば警告する
        $body.on('click', '#' + this.modalId + ' ' + '.btnClose', () => {
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
                const btns = '#' + this.modalId + ' .modal-footer .btn',
                    chkDelete = '#' + this.modalId + ' ' + '.form-check-input',
                    $attrObj = $(btns + ',' + chkDelete);
                $attrObj.attr('disabled', 'disabled');

                /**
                 * Alertsを解除時にボタンの有効無効を再設定
                 */
                $body.on('click', '#' + this.modalId + ' ' + '.alertClose',
                    () => this.disabledBtnArea($attrObj));
                /**
                 * そのまま閉じる
                 */
                $body.on('click', '#' + this.modalId + ' ' + '.modalClose',
                    () => this.closeModal());
            } else {
                this.closeModal();
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
        // 新しいタグを作る
        $('<div>', {
            id: this.cellItemId,
            text: this.text,
            class: 'bg-warning rounded-lg p-2 m-1',
            // モーダルダイアログを出すための属性
        }).appendTo('#' + this.cellId);

        this.addModal();
        this.addInput();

        /**
         * modalを開くときの処理
         */
        $('#' + this.cellId).on('click', '#' + this.cellItemId, () => {
            // 背景の設定
            $('<div>', {
                class: 'modal-backdrop show',
            }).appendTo('body');
            // 保存成功アラートは消しておく
            $('.modal-alert-success').hide();
            // modal画面の表示
            $('#' + this.modalId).show();
            // modalを開いたときは必ず非チェック状態とする
            $('#' + deleteCheck + this.id).prop('checked', false);
            // modalを開いたときはボタンは有効化する
            const $attrObj = $(
                '#' + this.modalId + ' .modal-footer .btn' + ',' +
                '#' + this.modalId + ' ' + '.form-check-input',
            );
            this.disabledBtnArea($attrObj);
            $('#' + this.modalId + ' ' + '.form-control').val(this.text);
        });
    }
}
module.exports = Task;
