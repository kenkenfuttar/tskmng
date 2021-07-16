/**
 * @file modal.js
 */
'use strict';

/**
 * @class Modal
 */
class Modal {
    mId = 'modal';
    dId = 'deleteCheck';
    /**
     * Modalコンストラクタ
     * @param {number} id
     */
    constructor(id) {
        this.id = id;
        this.mId += id;
        this.dId += id;
    }
    /**
     * modalを閉じる処理
     */
    closeModal() {
        $('.modal-alert').removeClass('alert-show').addClass('alert-hide');
        $('#' + this.mId + ',' + '.alert').hide();
        // 背景削除
        $('.modal-backdrop').remove();
    }
    /**
     * Deleteボタンを無効・有効化する
     */
    disabledDelete() {
        const $btnDelete = $('#' + this.mId + ' ' + '.btnDelete');
        if ($('#' + this.dId).prop('checked')) {
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
        $('#' + this.mId).show();
        // modalを開いたときは必ず非チェック状態とする
        $('#' + this.dId).prop('checked', false);
        // modalを開いたときはボタンは有効化する
        const $attrObj = $(
            '#' + this.mId + ' .modal-footer .btn' + ',' +
            '#' + this.mId + ' ' + '.form-check-input',
        );
        this.disabledBtnArea($attrObj);
        // タスクの読み直し
        $('#' + this.mId + ' ' + '.form-control').val(text);
        this.changeUrgent(cellId.urgent);
        this.changeHeavy(cellId.heavy);
    }

    /**
     * 緊急バッチの変更
     * @param {boolean} urgent 変更後の緊急フラグ
     */
    changeUrgent(urgent) {
        const $urgent = $('#' + this.mId + ' ' + '.urgent'),
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
        const $heavy = $('#' + this.mId + ' ' + '.heavy'),
            className = 'bg-white';
        if (heavy) {
            $heavy.removeClass(className);
        } else {
            $heavy.addClass(className);
        }
    }

    /**
     * @desc バッヂの表示設定
     * @param {{heavy: boolean, urgent: boolean}} cellId 表示場所のID
     */
    setBadge(cellId) {
        // TODO: もう少し効率よく書けそう
        if (cellId.heavy) {
            if (!cellId.urgent) {
                $('#' + this.mId + ' ' + '.urgent')
                    .addClass('bg-white border border-danger text-dark');
            }
        } else {
            if (cellId.urgent) {
                $('#' + this.mId + ' ' + '.heavy')
                    .addClass('bg-white border border-warning');
            } else {
                $('#' + this.mId + ' ' + '.urgent')
                    .addClass('bg-white border border-danger text-dark');
                $('#' + this.mId + ' ' + '.heavy')
                    .addClass('bg-white border border-warning');
            }
        }
    }

    /**
     * @desc bodyの直下にモーダル用のtemplateタグの中身を複製する
     * @param {{heavy: boolean, urgent: boolean}} cellId 表示場所のID
     * @param {string} text タスクの表示内容
     */
    copyTemplate(cellId, text) {
        // $('#' + 'templateTarget').load('.\\dest\\modalTemplate.html');
        /**
         * {@link https://developer.mozilla.org/ja/docs/Web/HTML/Element/template}
         * @desc id==modalTemplateの中身をbody直下に複製する
         */
        if ('content' in document.createElement('template')) {
            console.log('対応しているよ');
            const
                /**
                 * @type {HTMLBodyElement}
                 * @desc コピー先の親要素
                 */
                body = document.querySelector('body'),
                /**
                 * @type {Element}
                 * @desc コピー元の要素
                 */
                template = document.querySelector('#modalTemplate'),
                /**
                 * @type {HTMLTemplateElement}
                 * @readonly
                 * @desc コピー元から複製した内容. DOMには未反映.
                 */
                clone = template.content.cloneNode(true);

            body.prepend(clone);
            // 複製した内容の書き換え
            $('#modaln').attr('id', this.mId);
            $('#deleteCheck').attr('id', this.dId);
            $('label .form-check-label').attr('for', this.dId);
            // バッヂの設定
            this.setBadge(cellId);
            $('#' + this.mId + ' ' + '.form-control').val(text);
        } else {
            console.log('対応してないよ');
        }
    }
}
module.exports = Modal;
