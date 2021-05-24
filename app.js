const express = require('express');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/', (req, res, next) => {

    /*     const left = req.body.saveItem1;
        if (left == '') {
            console.log("エラー");
            res.redirect('/');
        } */
    var inputItems = req.body.inputItem;
    if (!Array.isArray(inputItems)) {
        inputItems = Array(inputItems);
    }
    console.log(inputItems);
    // シングルコートがあるとJSON.parseでエラーが出るため、取り除く
    //var test = inputItems.replace('\'', '');
    //console.log(test);
    var json = [];
    inputItems.forEach((value) => {
        //var items = JSON.parse(value);
        //console.log(items);
        json.push(value);
    }
    );
    console.log(json);
    console.log(JSON.stringify(json));
    
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
