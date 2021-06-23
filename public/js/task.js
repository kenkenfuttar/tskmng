'use strict';
class Task {
    constructor(text, id, cellId) {
        this.text = text;
        this.id = id;
        this.cellId = cellId;
    }

    addTask = () => {
        // 新しいタグを作る
        $("<div>", {
            id: 'cellItem' + this.id,
            text: this.text,
            class: 'bg-warning rounded-lg p-2 m-1'
        }).appendTo('#' + this.cellId);
    }
}
module.exports = Task;