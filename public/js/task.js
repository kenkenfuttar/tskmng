/**
 * @file task.js
 * @author kenkenfutter <https://github.com/kenkenfuttar>
 * @version 0.0.1α
 */
'use strict';
const
    $ = require('jquery'),
    Modal = require('./modal.js'),
    /**
     * @type {string}
     * @desc 削除チェックボックスのidのprefix
     * @example <caption>deleteCheck + 1 = 'deleteCheck1'</caption>
     */
    deleteCheck = 'deleteCheck',
    /**
     * @type {JQuery<HTMLElement>}
     * @desc bodyのjQueryオブジェクト、追加要素操作用
     */
    $body = $('body');

/**
 * @since 0.0.1α
 * @desc タスク一覧画面に表示されるひとつのタスク
 */
class Task {
    /**
     * @type {{text: string,
        id: number,
        cellId: {heavy: boolean, urgent: boolean}}}
     * @desc ファイルに書き込まれる内容をまとめたtaskオブジェクト
     */
    task = {};
    /**
     * @type {string}
     * @desc タスク一覧上でのidに相当する値
     * @example <caption>cellItem + 1 = 'cellItem1'</caption>
     */
    cellItemId = 'cellItem';
    /**
     * @type {string}
     * @desc タスクに対して紐づけられるmodal画面のidに相当する値
        taskオブジェクト作成時にmodal画面も作成され、idが採番される
     * @example <caption>modal + 1 = 'modal1'</caption>
     */
    modalId = 'modal';
    /**
     * @property @private
     * @type {boolean}
     * @desc 緊急度. true: 緊急, false:緊急ではない
     */
    urgent;
    /**
     * @type {boolean}
     * @desc 重要度. true: 重要, false:重要ではない
     */
    heavy;
    inputItemId = 'inputItem';

    /**
     * @since 0.0.1α
     * @param {string} text タスクの表示内容
     * @param {number} id 管理用ID
     * @param {{heavy: boolean, urgent: boolean}} cellId 表示場所のID
     * @desc タスクの入力情報とmodal画面の管理用の情報を設定する
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
        this.cellItemId += this.id;
        this.modalId += this.id;
        this.inputItemId += this.id;
    };

    /**
     * @method removeTask
     * @since 0.0.1α
     * @desc タスクを削除する
     * @return {void}
     */
    removeTask() {
        const $removeObj = $(
            // 一覧のタグ
            '#' + this.cellItemId + ',' +
            // inputのタグ
            '#' + this.inputItemId,
        );
        $removeObj.remove();
    }

    /**
     * @method checkModify
     * @since 0.0.1α
     * @desc 変更チェック
     * @return {boolean} 変更があった場合trueを返す
     */
    checkModify() {
        // 重要バッヂ
        if (this.cellId.heavy != this.heavy) return true;

        // 緊急バッヂ
        if (this.cellId.urgent != this.urgent) return true;

        // テキストボックス
        const textVal = $('#' + this.modalId + ' ' + '.txtTask').val();
        if (textVal != this.text) return true;

        // 何も変更がない場合falseを返す
        return false;
    }

    /**
     * @method showAlert
     * @param {Modal} modal modal画面
     */
    showAlert(modal) {
        const $modalAlert = $('.modal-alert');
        if ('content' in document.createElement('template')) {
            const
                // alertテンプレートの値を取得
                modalAlert = document.querySelector(
                    '#' + this.modalId + ' .modal-alert'),
                template = document.querySelector('#alertTemplate'),
                clone = template.content.cloneNode(true);
            modalAlert.append(clone);
            $modalAlert.removeClass('alert-hide').addClass('alert-show');
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
        $body.on('click', '#' + this.modalId + ' ' + '.alertClose', () => {
            // modalのサイズを元に戻す。
            $modalAlert.removeClass('alert-show').addClass('alert-hide');
            // ボタンの有効化
            modal.disabledBtnArea($attrObj);
            $('.modal-alert-yesno').remove();
        });
        /**
         * そのまま閉じる
         */
        $body.on('click', '#' + this.modalId + ' ' + '.modalClose', () => {
            $('.modal-alert-yesno').remove();
            modal.closeModal();
        });
    }
    /**
     * @method addModal
     */
    addModal() {
        const modal = new Modal(this.id);
        if ($('#' + this.modalId).length == 0) {
            // bodyの直下にモーダル用のtemplateタグの中身を複製する
            modal.copyTemplate(this.cellId, this.text);
        }

        // check時にDeleteボタンが使えるようにする（checkしてないときは使えないようにする）
        /**
         * @event checkbox変更時
         */
        $body.on('change', '#' + deleteCheck + this.id, () => {
            modal.disabledDelete();
        });

        // Deleteでデータを削除する
        $body.on('click', '#' + this.modalId + ' ' + '.btnDelete', () => {
            this.removeTask();
            // 背景をもとに戻す
            $('#' + this.modalId + ',' + '.modal-backdrop').remove();
        });

        // SaveChangesタスクの内容を書き換える
        $body.on('click', '#' + this.modalId + ' ' + '.btnSave', () => {
            this.text = $('#' + this.modalId + ' ' + '.txtTask').val();
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
                this.showAlert(modal);
                console.log('1');
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
     * @method addInput
     * @return {HTMLElement}
     */
    addInput() {
        console.table(this.task);
        console.log(this.task);

        console.log(JSON.stringify(this.task));
        return $('<input>', {
            id: this.inputItemId,
            name: 'inputItem',
            value: JSON.stringify(this.task),
            type: 'hidden',
        });
    };

    /**
     * @method openTask
     * @return {void}
     */
    openTask() {
        const modal = new Modal(this.id);
        modal.openModal(this.text, this.cellId);
    }

    /**
     * @method getBackGroundColor
     * @param {number} bgNumber 色設定変数 0～2
     * @return {string} bootstrapの背景色名
     */
    getBackGroundColor(bgNumber) {
        let bg;
        switch (bgNumber) {
            case 0:
                bg = 'bg-success';
                break;
            case 1:
                bg = 'bg-warning';
                break;
            case 2:
                bg = 'bg-danger';
                break;
            default:
                bg = 'bg-warning';
                break;
        }

        return bg;
    }

    /**
     * @method addTask
     * @return {void}
     */
    addTask() {
        let
            /**
             * @type {string}
             * @desc タスクの表示位置
             */
            cell,
            /**
             * @type {number|string}
             * @desc タスクの表示色
             * {@link https://getbootstrap.com/docs/4.6/utilities/colors/#background-color}
             */
            bgNumber = 0;

        if (this.cellId.heavy) {
            cell = '#heavyAnd';
            bgNumber++;
        } else {
            cell = '#unheavyAnd';
            bgNumber = 0;
        }

        if (this.cellId.urgent) {
            cell += 'Urgent';
            bgNumber++;
        } else {
            cell += 'Unurgent';
            bgNumber += 0;
        }

        const bg = this.getBackGroundColor(bgNumber);

        // 新しいタグを作る
        $('<div>', {
            id: this.cellItemId,
            text: this.text,
            class: bg + ' rounded-lg p-2 m-1',
        }).appendTo(cell);
        if ($('#' + this.modalId).length == 0) this.addModal();
        this.addInput().appendTo('#formIndex');

        /**
         * タスククリックイベント
         */
        $(cell).on('click', '#' + this.cellItemId, () => this.openTask());
    }
}
module.exports = Task;
