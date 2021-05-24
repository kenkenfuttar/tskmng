const express = require('express');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    var json = JSON.parse(
    fs.readFileSync('.\\data\\out.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("data:" + data);
    }));
    console.log("parse:" + json);
    res.render('index.ejs', {items: json});
});

app.post('/', (req, res, next) => {

    var inputItems = req.body.inputItem;
    if (!Array.isArray(inputItems)) {
        inputItems = Array(inputItems);
    }
    // console.log(inputItems);

    var json = [];
    inputItems.forEach((value) => {
        json.push(value);
    });
    // console.log(json);
    // console.log(JSON.stringify(json));

    fs.writeFile('.\\data\\out.txt', JSON.stringify(json), (err, data) => {
        if (err) console.log(err);
        else console.log('write end');
    });

    /*     try {
            fs.writeFileSync(".\\data\\out.txt", left);
            console.log('write end');
        } catch (e) {
            console.log(e);
        } */

    res.redirect('/');
});

app.listen(3000);
