'use strict';

const
    Modal = require('../public/js/modal.js'),
    Task = require('../public/js/task.js'),
    fs = require('fs'),
    $ = require('jquery');
// let task;
// let tasks = [];


describe('task.js-false-true', () => {
    let text, id, cellId, task;
    beforeEach(() => {
        text = 'test';
        id = 0;
        cellId = { heavy: false, urgent: true };
        task = new Task(text, id, cellId);
    });
    afterEach(() => {
        task = null;
    });

    test('testConstructor', () => {
        expect(task.text).toBe(text);
        expect(task.id).toBe(id);
        expect(task.cellId).toBe(cellId);
        // TODO: 対応保留
        // expect(task.task).toHaveLength(1);
        expect(task.task.text).toBe(text);
        expect(task.task.id).toBe(id);
        expect(task.task.cellId).toBe(cellId);
    });

    test('testAddTask', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        const expected =
            '<div id="cellItem0" class="bg-warning rounded-lg p-2 m-1">' +
            'test' +
            '</div>';
        expect($('#unheavyAndUrgent').html()).toEqual(expected);
    });

    test('testAddInput', () => {
        // 結果の生成
        const received = task.addInput();

        // 比較の実施
        expect(received[0].getAttribute('id')).toBe('inputItem0');
        expect(received[0].getAttribute('name')).toBe('inputItem');
        expect(received[0].getAttribute('value'))
            .toBe(JSON.stringify(task.task));
        expect(received[0].getAttribute('type')).toBe('hidden');
    });
    test('testCheckModify-changeText', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        $('.txtTask').val('a');
        expect(task.checkModify()).toBe(true);
    });
    test('testCheckModify-changeUrgent', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        task.urgent = false;
        expect(task.checkModify()).toBe(true);
    });
});

describe('task.js-true-true', () => {
    let text, id, cellId, task;
    beforeEach(() => {
        text = 'test';
        id = 0;
        cellId = { heavy: true, urgent: true };
        task = new Task(text, id, cellId);
    });
    afterEach(() => {
        task = null;
    });

    test('testAddTask', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        const expected =
            '<div id="cellItem0" class="bg-danger rounded-lg p-2 m-1">' +
            'test' +
            '</div>';
        expect($('#heavyAndUrgent').html()).toEqual(expected);
        // TODO: addModalが呼ばれたことのテスト
    });

    test('testCheckModify-noChange', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        expect(task.checkModify()).toBe(false);
    });
});

describe('task.js-false-false', () => {
    let text, id, cellId, task;
    beforeEach(() => {
        text = 'test';
        id = 0;
        cellId = { heavy: false, urgent: false };
        task = new Task(text, id, cellId);
    });
    afterEach(() => {
        task = null;
    });

    test('testAddTask', () => {
        const openTask = jest.spyOn(task, 'openTask');

        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        const expected =
            '<div id="cellItem0" class="bg-success rounded-lg p-2 m-1">' +
            'test' +
            '</div>';
        expect($('#unheavyAndUnurgent').html()).toEqual(expected);
        // TODO: addModalが呼ばれたことのテスト
        $('#cellItem0').trigger('click');
        expect(openTask).toBeCalled();
    });

    test('testOpenTask', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        const received = task.openTask();
        expect(received.id).toBe(0);
        expect(received.dId).toBe('deleteCheck0');
        expect(received.mId).toBe('modal0');
    });

    test('testRemoveTask', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        task.removeTask();
        expect($('#inputItem0').html()).toBeUndefined();
        expect($('#cellItem0').html()).toBeUndefined();
        expect($('#modal0').html()).toStrictEqual(expect.anything());
    });
    test('testCheckModify-changeHeavy', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        task.heavy = true;
        expect(task.checkModify()).toBe(true);
    });
    test('testGetBackGroundColor', () => {
        expect(task.getBackGroundColor(0)).toBe('bg-success');
        expect(task.getBackGroundColor(1)).toBe('bg-warning');
        expect(task.getBackGroundColor(2)).toBe('bg-danger');
        expect(task.getBackGroundColor(3)).toBe('bg-warning');
        expect(task.getBackGroundColor(4)).toBe('bg-warning');
    });
    test('testShowAlert-no', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        expect($('.modal-alert-yesno').length).toBe(0);
        const
            modal = new Modal(task.id),
            $modalAlert = $('.modal-alert');
        task.showAlert(modal);
        expect($modalAlert.hasClass('alert-show')).toBeTruthy();
        expect($modalAlert.hasClass('alert-hide')).toBeFalsy();
        expect($('.modal-alert-yesno').length).toBe(1);
        expect(
            $('#' + task.modalId + ' .modal-footer .btn')
                .is('[disabled=disabled]'),
        ).toBeTruthy();
        expect(
            $('#' + task.modalId + ' ' + '.form-check-input')
                .is('[disabled=disabled]'),
        ).toBeTruthy();

        // NOボタンクリック
        $('#modal0 .alertClose').trigger('click');
        expect($modalAlert.hasClass('alert-hide')).toBeTruthy();
        expect($modalAlert.hasClass('alert-show')).toBeFalsy();
        const
            disabledBtnArea = jest.spyOn(modal, 'disabledBtnArea')
                .mockImplementation(($attrObj) => {
                    return true;
                });
        expect(disabledBtnArea(
            $('#' + task.modalId + ' .modal-footer .btn' + ',' +
                '#' + task.modalId + ' ' + '.form-check-input'),
        )).toBeTruthy();
        expect($('.modal-alert-yesno').length).toBe(0);
    });
    test('testShowAlert-yes', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        expect($('.modal-alert-yesno').length).toBe(0);
        const
            modal = new Modal(task.id),
            $modalAlert = $('.modal-alert');
        task.showAlert(modal);
        expect($modalAlert.hasClass('alert-show')).toBeTruthy();
        expect($modalAlert.hasClass('alert-hide')).toBeFalsy();
        expect($('.modal-alert-yesno').length).toBe(1);
        expect(
            $('#' + task.modalId + ' .modal-footer .btn')
                .is('[disabled=disabled]'),
        ).toBeTruthy();
        expect(
            $('#' + task.modalId + ' ' + '.form-check-input')
                .is('[disabled=disabled]'),
        ).toBeTruthy();

        // YESボタンクリック
        $('#modal0 .modalClose').trigger('click');
        expect($('.modal-alert-yesno').length).toBe(0);
        const
            closeModal = jest.spyOn(modal, 'closeModal')
                .mockImplementation(() => {
                    return true;
                });
        expect(closeModal).toBeTruthy();
    });
});
describe('task.js-modal重複', () => {
    let text, id, cellId, task;
    beforeEach(() => {
        text = 'test';
        id = 0;
        cellId = { heavy: false, urgent: false };
        task = new Task(text, id, cellId);
    });
    afterEach(() => {
        task = null;
    });
    test('testAddTask-addModal', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        expect($('#modal0').length).toBe(0);
        task.addTask();
        expect($('#modal0').length).toBe(1);
        task.addModal();
        expect($('#modal0').length).toBe(1);
    });
    test('testAddTask-addTask', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        expect($('#modal0').length).toBe(0);
        task.addTask();
        expect($('#modal0').length).toBe(1);
        task.addTask();
        expect($('#modal0').length).toBe(1);
    });
});
describe('task.js-addModalイベント', () => {
    let text, id, cellId, task, modal;
    beforeEach(() => {
        text = 'test';
        id = 0;
        cellId = { heavy: false, urgent: false };
        task = new Task(text, id, cellId);
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        modal = new Modal(task.id);
        task.addModal();
    });
    afterEach(() => {
        task = null;
    });
    test('testAddModal-changeCheck', () => {
        const disabledDelete = jest.spyOn(modal, 'disabledDelete')
            .mockImplementation(() => {
                return true;
            });
        $('#deleteCheck0').trigger('change');
        expect(disabledDelete).toBeTruthy();
    });
    test('testAddModal-deleteClick', () => {
        const removeTask = jest.spyOn(task, 'removeTask')
            .mockImplementation(() => {
                return true;
            });
        task.openTask();
        expect($('#modal0').length).toBe(1);
        expect($('.modal-backdrop').length).toBe(1);
        // ボタンがdisabledになっているので解除してからテストする
        $('#modal0 .btnDelete').removeAttr('disabled');
        $('#modal0 .btnDelete').trigger('click');
        expect(removeTask).toBeTruthy();
        expect($('#modal0').length).toBe(0);
        expect($('.modal-backdrop').length).toBe(0);
    });
    test('testAddModal-saveClick', () => {
        $('#modal0 .txtTask').val('hogehoge');
        task.heavy = true;
        task.urgent = false;
        const
            removeTask = jest.spyOn(task, 'removeTask')
                .mockImplementation(() => {
                    return true;
                }),
            addTask = jest.spyOn(task, 'addTask')
                .mockImplementation(() => {
                    return true;
                });
        $('#modal0 .btnSave').trigger('click');
        expect(task.text).toBe('hogehoge');
        expect(task.cellId.heavy).toBeTruthy();
        expect(task.cellId.urgent).toBeFalsy();
        expect(task.task.text).toBe('hogehoge');
        expect(removeTask).toBeTruthy();
        expect(addTask).toBeTruthy();
        setTimeout(() => {
            expect($('.modal-alert-success').css('display')).toBe('none');
        }, 8000);
    });
    test('testAddModal-closeClick', () => {
        const
            showAlert = jest.spyOn(task, 'showAlert')
                .mockImplementation(() => {
                    return true;
                });
        $('#modal0 .btnClose').trigger('click');
        expect(showAlert).toBeTruthy();
    });
});

