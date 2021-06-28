// 別ファイルからDOM要素を読み込むのに必要
const fs = require('fs');

const index = require('../public/js/index.implement.js');

describe('index.implement1.js', () => {
    document.body.innerHTML = fs.readFileSync(__dirname + '/index.test.html',
        { encoding: 'utf-8' });
    test('testGetCellId', () => {
        expect(index.getCellId()).toEqual('heavyAndUrgent');
    });
});

describe('index.implement2.js', () => {
    document.body.innerHTML = fs.readFileSync(__dirname + '/index.test2.html',
        { encoding: 'utf-8' });
    test('testGetCellId2', () => {
        expect(index.getCellId()).toEqual('heavyAndUnurgent');
    });

    document.body.innerHTML = fs.readFileSync(__dirname + '/index.test3.html',
        { encoding: 'utf-8' });
    test('testGetCellId3', () => {
        expect(index.getCellId()).toEqual('unheavyAndUrgent');
    });

    document.body.innerHTML = fs.readFileSync(__dirname + '/index.test4.html',
        { encoding: 'utf-8' });
    test('testGetCellId4', () => {
        expect(index.getCellId()).toEqual('unheavyAndUnurgent');
    });
});
