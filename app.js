const express = require('express'),
    fs = require('fs'),
    app = express(),
    dataDir = '.\\data';

console.log(new Date());
console.log(process.env.NODE_ENV);
console.log(process.env.EXEMODE);

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    // ディレクトリが存在しない場合は作成する。
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, (err) => {
            if (err) throw err;
        });
    }

    // ファイルが存在しない場合は作成する。
    const readFileParam = {
        encoding: 'utf-8',
        flag: fs.constants.O_RDWR | fs.constants.O_CREAT,
    };
    let file = fs.readFileSync(dataDir + '\\out.txt',
        readFileParam, (err, data) => {
            if (err) throw err;
            console.log('data:' + data);
        });

    // fileが空だった場合は仮に設定する。
    if (file == '') {
        file = '[]';
    }

    const jsonstr = JSON.stringify(JSON.parse(file));
    console.log(jsonstr);
    res.render('index.ejs', {
        'items': jsonstr,
        'nodeEnv': process.env.NODE_ENV,
    });
});

app.post('/', (req, res, next) => {
    let inputItems = req.body.inputItem;
    if (!Array.isArray(inputItems)) {
        inputItems = Array(inputItems);
    }

    const json = [];
    inputItems.forEach((value) => {
        json.push(value);
    });

    fs.writeFile(dataDir + '\\out.txt', JSON.stringify(json), (err, data) => {
        if (err) console.log(err);
        else console.log('write end');
    });

    res.redirect('/');
});

app.listen(3000);
