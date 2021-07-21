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
    test('testCheckModify', () => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        task.addTask();
        $('.txtTask').val('a');
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

    test('testCheckModify', () => {
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
    test('testCheckModify', () => {
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
    test('testShowAlert', () => {
        expect($('.modal-alert-yesno').length).toBe(0);
        const modal = new Modal(task.id);
        task.showAlert(modal);
        expect($('.modal-alert-yesno').length).toBe(1);
    });
});
