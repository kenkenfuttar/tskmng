const index = require('../public/js/task.js');

let task;
let tasks;


describe('index.js_taskなし', () => {
    beforeEach(() => {
        task = index.__get__('task');
        tasks = index.__get__('tasks');
    });

    afterEach(() => {
        index.__set__({
            task: { text: '', id: '', cellId: '' },
            tasks: [],
            idNumber: 0,
        });
    });

    // TODO: 代わりにコンストラクタのテストを実施する
    const createTaskForId = index.__get__('createTaskForId');
    test('testCreateTaskForId', () => {
        expect(task.text).toBe('');
        expect(task.id).toBe('');
        expect(task.cellId).toBe('');
        expect(tasks).toHaveLength(0);
        document.body.innerHTML = '<input id="addText" value="test">';
        createTaskForId('unheavyAndUrgent');

        expect(task.text).toBe('test');
        expect(task.id).toBe(0);
        expect(task.cellId).toBe('unheavyAndUrgent');
        expect(tasks).toHaveLength(1);
    });
});

describe('index.js_taskあり', () => {
    beforeEach(() => {
        task = { text: 'index.js_taskあり', id: 0, cellId: 'hogehoge' };
        index.__set__({
            task: task,
            tasks: [task],
            idNumber: 1,
        });
        task = index.__get__('task');
        tasks = index.__get__('tasks');
    });

    const addTask = index.__get__('addTask');
    test('testAddTask', () => {
        document.body.innerHTML = '<div id="hogehoge"></div>';
        addTask('hogehoge');
        const expected =
            '<div id="hogehoge">' +
            '<div id="cellItem0" class="bg-warning rounded-lg p-2 m-1">' +
            'index.js_taskあり' +
            '</div>' +
            '</div>';
        expect(document.body.innerHTML).toBe(expected);
    });

    const addInput = index.__get__('addInput');
    test('testAddInput', () => {
        document.body.innerHTML = '<div id="formIndex"></div>';
        addInput();

        // 結果の生成
        const received = document.body.innerHTML.replace(/&quot;/g, '\"');
        // 期待値の生成
        const expected =
            '<div id="formIndex">' +
            '<input id="inputItem0" name="inputItem" value="' +
            JSON.stringify(task) +
            '" type="hidden">' +
            '</div>';
        console.log(expected);

        // 比較の実施
        expect(received).toBe(expected);
    });
});
