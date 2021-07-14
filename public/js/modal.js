/**
 * @file modal.js
 */
'use strict';

/**
 * @class Modal
 */
class Modal {
    /**
     * Modalコンストラクタ
     * @param {string} modalId
     */
    constructor(modalId) {
        this.id = modalId;
    }
    /**
     * modalを閉じる処理
     */
    closeModal() {
        $('.modal-alert').removeClass('alert-show').addClass('alert-hide');
        $('#' + this.id + ',' + '.alert').hide();
        // 背景削除
        $('.modal-backdrop').remove();
    }
    /**
     * Deleteボタンを無効・有効化する
     */
    disabledDelete() {
        const $btnDelete = $('#' + this.id + ' ' + '.btnDelete');
        if ($('#' + this.id + ' ' + '.form-check-input').prop('checked')) {
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
     * modalを開くときの処理
     * @param {string} text タスクの文面
     */
    /**
     * modalを開くときの処理
     * @param {string} text タスクの文面
     * @param {{heavy: boolean, urgent: boolean}} cellId 表示場所のID
     */
    openModal(text, cellId) {
        // 背景の設定
        $('<div>', {
            class: 'modal-backdrop show',
        }).appendTo('body');
        // 保存成功アラートは消しておく
        $('.modal-alert-success').hide();
        // modal画面の表示
        $('#' + this.id).show();
        // modalを開いたときは必ず非チェック状態とする
        $('#' + this.id + ' ' + '.form-check-input').prop('checked', false);
        // modalを開いたときはボタンは有効化する
        const $attrObj = $(
            '#' + this.id + ' .modal-footer .btn' + ',' +
            '#' + this.id + ' ' + '.form-check-input',
        );
        this.disabledBtnArea($attrObj);
        // タスクの読み直し
        $('#' + this.id + ' ' + '.form-control').val(text);
        this.changeUrgent(cellId.urgent);
        this.changeHeavy(cellId.heavy);
    }

    /**
     * 緊急バッチの変更
     * @param {boolean} urgent 変更後の緊急フラグ
     */
    changeUrgent(urgent) {
        const $urgent = $('#' + this.id + ' ' + '.urgent'),
            className = 'bg-white text-dark';
        if (urgent) {
            $urgent.removeClass(className);
        } else {
            $urgent.addClass(className);
        }
    }

    /**
     * 重要バッチの変更
     * @param {boolean} heavy 変更後の重要フラグ
     */
    changeHeavy(heavy) {
        const $heavy = $('#' + this.id + ' ' + '.heavy'),
            className = 'bg-white';
        if (heavy) {
            $heavy.removeClass(className);
        } else {
            $heavy.addClass(className);
        }
    }
}
module.exports = Modal;

