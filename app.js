// const { json } = require('express');
const express = require('express'),
    fs = require('fs'),
    app = express();

console.log(new Date());
console.log(process.env.NODE_ENV);
console.log(process.env.EXEMODE);

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const
        readFileParam = {
            encoding: 'utf-8',
            flag: fs.constants.O_RDWR | fs.constants.O_CREAT,
        },
        file = fs.readFileSync('.\\data\\out.txt',
            readFileParam, (err, data) => {
                if (err) throw err;
                console.log('data:' + data);
            }),
        jsonstr = JSON.stringify(JSON.parse(file));
    console.log(jsonstr);
    res.render('index.ejs', {
        'items': jsonstr,
        'nodeEnv': process.env.NODE_ENV,
    });
});

app.post('/', (req, res, next) => {
    const inputItems = req.body.inputItem;
    if (!Array.isArray(inputItems)) {
        inputItems = Array(inputItems);
    }

    const json = [];
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
