const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
// 別ファイルからDOM要素を読み込むのに必要
const fs = require("fs");

const index = require('../public/js/index');

let task;
let tasks;


describe('index.js_taskなし', () => {
    beforeEach(() => {
        task = index.__get__('task');
        tasks = index.__get__('tasks');
    });

    afterEach(() => {
        index.__set__({
            task: { text: "", id: "", cellId: "" },
            tasks: [],
            idNumber: 0
        });
    });

    const getCellId = index.__get__('getCellId');
    document.body.innerHTML = fs.readFileSync(__dirname + "/index.test.html", { encoding: "utf-8" });
    test('testGetCellId', () => {
        expect(getCellId()).toEqual('heavyAndUrgent');
    });

    const createTaskForId = index.__get__('createTaskForId');
    test('testCreateTaskForId', () => {
        expect(task.text).toBe("");
        expect(task.id).toBe("");
        expect(task.cellId).toBe("");
        expect(tasks).toHaveLength(0);
        document.body.innerHTML = '<input id="addText" value="test">';
        expect(createTaskForId("unheavyAndUrgent")).toBe();
        expect(task.text).toBe("test");
        expect(task.id).toBe(0);
        expect(task.cellId).toBe("unheavyAndUrgent");
        expect(tasks).toHaveLength(1);
    });

    const createTaskForJSON = index.__get__('createTaskForJSON');
    test('testCreateTaskForJSON', () => {
        const item = { text: "test", id: "0", cellId: "hogehoge" };
        expect(task.text).toBe("");
        expect(task.id).toBe("");
        expect(task.cellId).toBe("");
        expect(tasks).toHaveLength(0);
        document.body.innerHTML = '<input id="addText" value="test2">';
        expect(createTaskForJSON(item)).toBe();
        expect(task.text).toBe(item.text);
        expect(task.id).toBe(0);
        expect(task.cellId).toBe(item.cellId);
        expect(tasks).toHaveLength(1);
    });


});

describe('index.js_taskあり', () => {
    beforeEach(() => {
        task = { text: "index.js_taskあり", id: 0, cellId: "hogehoge" };
        index.__set__({
            task: task,
            tasks: [task],
            idNumber: 1
        });
        task = index.__get__('task');
        tasks = index.__get__('tasks');
    });

    const addTask = index.__get__('addTask');
    test('testAddTask', () => {
        document.body.innerHTML = '<div id="hogehoge"></div>';
        expect(addTask('hogehoge')).toBe();
        expect(document.body.innerHTML).toBe('<div id="hogehoge"><div id="cellItem0" class="bg-warning rounded-lg p-2 m-1">index.js_taskあり</div></div>')
    });

    const addInput = index.__get__('addInput');
    test('testAddInput', () => {
        document.body.innerHTML = '<div id="formIndex"></div>';
        let expected = '<input id="inputItem0" name="inputItem" value="' + JSON.stringify(task) + '" type="hidden">';
        expect(addInput()).toBe();
        let received = document.body.innerHTML.$('#formIndex').html();
        console.log(received);
        console.log(expected);
        expect(received).toBe(expected);
    })
});