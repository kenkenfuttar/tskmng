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
     * @param {{heavy: boolean, urgent: boolean}} cellId 表示場所のID
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
        $('.modal-alert').removeClass('alert-show').addClass('alert-hide');
        $('#' + this.modalId + ',' + '.alert').hide();
        // 背景削除
        $('.modal-backdrop').remove();
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
     * 緊急バッチの変更
     * @param {boolean} urgent 変更後の緊急フラグ
     */
    changeUrgent(urgent) {
        const $urgent = $('#' + this.modalId + ' ' + '.urgent'),
            className = 'bg-white text-dark';
        if (urgent) {
            $urgent.removeClass(className);
        } else {
            $urgent.addClass(className);
        }
        this.cellId.urgent = urgent;
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
                        this.disabledBtnArea($attrObj);
                        $('.modal-alert-yesno').remove();
                    });
                /**
                 * そのまま閉じる
                 */
                $body.on('click', '#' + this.modalId + ' ' + '.modalClose',
                    () => {
                        $('.modal-alert-yesno').remove();
                        this.closeModal();
                    });
            } else {
                this.closeModal();
            }
        });

        $('.urgent').on('click', () => {
            this.changeUrgent(!this.cellId.urgent);
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
         * modalを開くときの処理
         */
        $(cell).on('click', '#' + this.cellItemId, () => {
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
