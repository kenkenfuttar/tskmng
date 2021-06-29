// 別ファイルからDOM要素を読み込むのに必要
const fs = require('fs'),
    index = require('../public/js/index.implement.js'),
    myDir = '/index.implement';

describe('index.implement.js', () => {
    test('testGetCellId', () => {
        document.body.innerHTML = fs.readFileSync(
            __dirname + myDir + '/index.test.html',
            { encoding: 'utf-8' });
        expect(index.getCellId()).toEqual('heavyAndUrgent');
    });

    test('testGetCellId2', () => {
        document.body.innerHTML = fs.readFileSync(
            __dirname + myDir + '/index.test2.html',
            { encoding: 'utf-8' });
        expect(index.getCellId()).toEqual('heavyAndUnurgent');
    });

    test('testGetCellId3', () => {
        document.body.innerHTML = fs.readFileSync(
            __dirname + myDir + '/index.test3.html',
            { encoding: 'utf-8' });
        expect(index.getCellId()).toEqual('unheavyAndUrgent');
    });

    test('testGetCellId4', () => {
        document.body.innerHTML = fs.readFileSync(
            __dirname + myDir + '/index.test4.html',
            { encoding: 'utf-8' });
        expect(index.getCellId()).toEqual('unheavyAndUnurgent');
    });
});
