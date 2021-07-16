'use strict';

const Task = require('../public/js/task.js'),
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
        console.log(task.task.text);
        document.body.innerHTML = '<div id="formIndex"></div>';
        task.addInput();

        const
            // 結果の生成
            received = document.body.innerHTML.replace(/&quot;/g, '\"'),
            // 期待値の生成
            expected =
                '<div id="formIndex">' +
                '<input id="inputItem0" name="inputItem" value="' +
                JSON.stringify(task.task) +
                '" type="hidden">' +
                '</div>';

        console.log(received);
        console.log(expected);
        console.log(task.task.text);

        // 比較の実施
        expect(received).toBe(expected);
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
            '<div id="cellItem0" class="bg-warning rounded-lg p-2 m-1">' +
            'test' +
            '</div>';
        expect($('#heavyAndUrgent').html()).toEqual(expected);
    });

    test('testAddInput', () => {
        console.log(task.task.text);
        document.body.innerHTML = '<div id="formIndex"></div>';
        task.addInput();

        const
            // 結果の生成
            received = document.body.innerHTML.replace(/&quot;/g, '\"'),
            // 期待値の生成
            expected =
                '<div id="formIndex">' +
                '<input id="inputItem0" name="inputItem" value="' +
                JSON.stringify(task.task) +
                '" type="hidden">' +
                '</div>';

        console.log(received);
        console.log(expected);
        console.log(task.task.text);

        // 比較の実施
        expect(received).toBe(expected);
    });
});
