/**
 * @file task.js
 */
'use strict';
const $ = require('jquery'),
    Modal = require('./modal.js');

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
     * @param {{heavy: boolean, urgent: boolean}} cellId 表示場所のID
     */
    constructor(text, id, cellId) {
        this.text = text;
        this.id = id;
        this.cellId = cellId;
        this.heavy = cellId.heavy;
        this.urgent = cellId.urgent;
        this.task.text = this.text;
        this.task.id = this.id;
        this.task.cellId = this.cellId;
        this.cellItemId = 'cellItem' + this.id;
        this.modalId = 'modal' + this.id;
    };

    /**
     * タスクを削除する
     */
    removeTask() {
        const $removeObj = $(
            // 一覧のタグ
            '#' + this.cellItemId + ',' +
            // inputのタグ
            '#' + 'inputItem' + this.id,
        );
        $removeObj.remove();
    }

    /**
     * 変更チェック
     * @return {boolean} 変更があった場合trueを返す
     */
    checkModify() {
        // 重要バッヂ
        if (this.cellId.heavy != this.heavy) {
            return true;
        }

        // 緊急バッヂ
        if (this.cellId.urgent != this.urgent) {
            return true;
        }

        // テキストボックス
        if ($('#' + this.modalId + ' ' + '.form-control').val() != this.text) {
            return true;
        }

        // 何も変更がない
        return false;
    }

    /**
     * addModal
     */
    addModal() {
        const modal = new Modal(this.modalId);
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
            // バッヂの設定
            if (this.cellId.heavy) {
                if (!this.cellId.urgent) {
                    $('#' + this.modalId + ' ' + '.urgent')
                        .addClass('bg-white border border-danger text-dark');
                }
            } else {
                if (this.cellId.urgent) {
                    $('#' + this.modalId + ' ' + '.heavy')
                        .addClass('bg-white border border-warning');
                } else {
                    $('#' + this.modalId + ' ' + '.urgent')
                        .addClass('bg-white border border-danger text-dark');
                    $('#' + this.modalId + ' ' + '.heavy')
                        .addClass('bg-white border border-warning');
                }
            }
            $('#' + this.modalId + ' ' + '.form-control').val(this.text);
        } else {
            console.log('対応してないよ');
        }

        // check時にDeleteボタンが使えるようにする（checkしてないときは使えないようにする）
        $body.on('change', '#' + deleteCheck + this.id, () => {
            modal.disabledDelete();
        });

        // Deleteでデータを削除する
        $body.on('click', '#' + this.modalId + ' ' + '.btnDelete', () => {
            this.removeTask();
            $('#' + this.modalId + ',' + '.modal-backdrop').remove();
        });

        // SaveChangesタスクの内容を書き換える
        $body.on('click', '#' + this.modalId + ' ' + '.btnSave', () => {
            this.text = $('#' + this.modalId + ' ' + '.form-control').val();
            this.cellId.heavy = this.heavy;
            this.cellId.urgent = this.urgent;
            this.task.text = this.text;

            // DOMの書き換え
            this.removeTask();
            this.addTask();
            $('.modal-alert-success').fadeIn(1000).delay(2000).fadeOut(2000);
        });

        // Close時未保存の内容があれば警告する
        $body.on('click', '#' + this.modalId + ' ' + '.btnClose', () => {
            if (this.checkModify()) {
                const $modalAlert = $('.modal-alert');
                if ('content' in document.createElement('template')) {
                    const
                        // alertテンプレートの値を取得
                        modalAlert = document.querySelector(
                            '#' + this.modalId + ' .modal-alert'),
                        template = document.querySelector('#alertTemplate'),
                        clone = template.content.cloneNode(true);
                    modalAlert.append(clone);
                    // $('.modal-alert-yesno').hide();
                    $modalAlert
                        .removeClass('alert-hide')
                        .addClass('alert-show');
                    setTimeout(() => {
                        $('.modal-alert-yesno').hide().fadeIn(300);
                    }, 1000);
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
                    () => {
                        // modalのサイズを元に戻す。
                        $modalAlert
                            .removeClass('alert-show')
                            .addClass('alert-hide');
                        // ボタンの有効化
                        modal.disabledBtnArea($attrObj);
                        $('.modal-alert-yesno').remove();
                    });
                /**
                 * そのまま閉じる
                 */
                $body.on('click', '#' + this.modalId + ' ' + '.modalClose',
                    () => {
                        $('.modal-alert-yesno').remove();
                        modal.closeModal();
                    });
            } else {
                modal.closeModal();
            }
        });

        $body.on('click', '#' + this.modalId + ' ' + '.urgent', () => {
            modal.changeUrgent(!this.urgent);
            this.urgent = !this.urgent;
        });

        $body.on('click', '#' + this.modalId + ' ' + '.heavy', () => {
            modal.changeHeavy(!this.heavy);
            this.heavy = !this.heavy;
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
        let cell, bg;
        if (this.cellId.heavy) {
            if (this.cellId.urgent) {
                cell = '#heavyAndUrgent';
                bg = 'bg-danger';
            } else {
                cell = '#heavyAndUnurgent';
                bg = 'bg-warning';
            }
        } else {
            if (this.cellId.urgent) {
                cell = '#unheavyAndUrgent';
                bg = 'bg-warning';
            } else {
                cell = '#unheavyAndUnurgent';
                bg = 'bg-success';
            }
        }
        $('<div>', {
            id: this.cellItemId,
            text: this.text,
            class: bg + ' rounded-lg p-2 m-1',
        }).appendTo(cell);


        this.addModal();
        this.addInput();

        /**
         * タスククリックイベント
         */
        $(cell).on('click', '#' + this.cellItemId, () => {
            const modal = new Modal(this.modalId);
            modal.openModal(this.text, this.cellId);
        });
    }
}
module.exports = Task;
