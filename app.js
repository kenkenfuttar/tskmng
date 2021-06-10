const { json } = require('express');
const express = require('express');
const fs = require('fs');

const app = express();

console.log(new Date());
console.log(process.env.NODE_ENV);
console.log(process.env.EXEMODE);

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    var file = fs.readFileSync('.\\data\\out.txt', {encoding:'utf-8', flag:fs.constants.O_RDWR | fs.constants.O_CREAT}, (err, data) => {
        if (err) throw err;
        console.log("data:" + data);
    });
    // TODO: 削除予定
/*     var json = JSON.parse(JSON.stringify(file));
    console.log("parse:" + json);
    console.log(Array.isArray(json));
    var jsonstr = JSON.stringify(json); */
    var jsonstr = JSON.stringify(file);
    console.log(jsonstr);
    res.render('index.ejs', {"items": jsonstr, "nodeEnv": process.env.NODE_ENV});
});

app.post('/', (req, res, next) => {

    var inputItems = req.body.inputItem;
    if (!Array.isArray(inputItems)) {
        inputItems = Array(inputItems);
    }

    var json = [];
    inputItems.forEach((value) => {
        json.push(value);
    });

    fs.writeFile('.\\data\\out.txt', JSON.stringify(json), (err, data) => {
        if (err) console.log(err);
        else console.log('write end');
    });
    
    res.redirect('/');
});

app.listen(3000);
