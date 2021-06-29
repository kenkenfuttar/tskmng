'use strict';

const Task = require('../public/js/task.js');
// let task;
// let tasks = [];


describe('task.js', () => {
    let text, id, cellId, task;
    beforeEach(() => {
        text = 'test';
        id = 0;
        cellId = 'unheavyAndUrgent';
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
        document.body.innerHTML = '<div id="unheavyAndUrgent"></div>';
        task.addTask();
        const expected =
            '<div id="unheavyAndUrgent">' +
            '<div id="cellItem0" class="bg-warning rounded-lg p-2 m-1">' +
            'test' +
            '</div>' +
            '</div>';
        expect(document.body.innerHTML).toBe(expected);
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
