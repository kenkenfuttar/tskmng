const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
// 別ファイルからDOM要素を読み込むのに必要
const fs = require("fs");

const index = require('../public/js/index');
describe('getCellId', () => {
    const getCellId = index.__get__('getCellId');
    const createTaskForId = index.__get__('createTaskForId');
        document.body.innerHTML = fs.readFileSync(__dirname + "/index.test.html", { encoding: "utf-8" });
    test('getCellId', () => {
        expect(getCellId()).toEqual('heavyAndUrgent');
    });

    test('createTaskForId', () => {
        const task = index.__get__('task');
        const tasks = index.__get__('tasks');
        document.body.innerHTML = '<input id="addText" value="test">';
        expect(createTaskForId("unheavyAndUrgent")).toBe();
        expect(task.text).toBe("test");
        expect(task.id).toBe(0);
        expect(task.cellId).toBe("unheavyAndUrgent");
        expect(tasks).toHaveLength(1);
    });

});