'use strict';

const
    Modal = require('../public/js/modal.js'),
    Task = require('../public/js/task.js'),
    $ = require('jquery'),
    fs = require('fs');

describe('modal.js', () => {
    let text, id, cellId, task, modal;
    beforeEach(() => {
        document.body.innerHTML =
            fs.readFileSync(__dirname + '\\index.test.html', 'utf-8');
        text = 'test';
        id = 0;
        cellId = { heavy: false, urgent: true };
        task = new Task(text, id, cellId);
        task.addTask();
        modal = new Modal(task.id);
    });
    afterEach(() => {
        task = null;
    });
    test('disabledDelete--checked', () => {
        $('#deleteCheck0').prop('checked', true);
        modal.disabledDelete();
        expect($('#modal0 .btnDelete').is('[disabled=disabled]')).toBe(false);
    });
    test('disabledDelete--unchecked', () => {
        $('#deleteCheck0').prop('checked', false);
        modal.disabledDelete();
        expect($('#modal0 .btnDelete').is('[disabled=disabled]')).toBe(true);
    });
});
