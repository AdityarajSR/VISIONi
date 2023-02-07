const fs = require('fs');

const path = require('path');

const express = require('express');

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/equipments', function(req, res){
    res.render('equipments');
});

app.get('/tractors', function(req, res){

    const filePath = path.join(__dirname, 'data', 'tractors.json');
    const tractordata = fs.readFileSync(filePath);
    const storeddata = JSON.parse(tractordata);


    res.render('tractors', {mytrac: storeddata});
})

app.get('/addtractor', function(req, res){
    res.render('addtractor');
})

app.post('/addtractor', function(req, res){
    const tractors = req.body;
    
    const filePath = path.join(__dirname, 'data', 'tractors.json');
    const tractordata = fs.readFileSync(filePath);
    const storeddata = JSON.parse(tractordata);

    storeddata.push(tractors);

    fs.writeFileSync(filePath, JSON.stringify(storeddata));

    res.redirect('/tractors');

})

app.listen(3000);