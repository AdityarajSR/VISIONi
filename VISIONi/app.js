const fs = require('fs');

const express = require('express');
const bodyparser = require('body-parser');

const path = require('path');

const app = express();


app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res){
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);
});

app.get('/equipments', function(req, res){
    const filePath = path.join(__dirname, 'views' , 'equipments.html');
    res.sendFile(filePath);
});

app.get('/tractors', function(req, res){
    const filePath = path.join(__dirname, 'views', 'tractors.html');
    res.sendFile(filePath);
})

app.get('/addtractor', function(req, res){
    const filePath = path.join(__dirname, 'views', 'addtractor.html')
    res.sendFile(filePath);
})

app.post('/addtractor', function(req, res){
    const tractors =  req.body;
    
    const filePath = path.join(__dirname, 'data', 'tractors.json');
    const tractordata = fs.readFileSync(filePath);
    const storeddata = JSON.parse(tractordata);

    storeddata.push(tractors);
    
    fs.writeFileSync(filePath, JSON.stringify(tractors));

    res.redirect('/tractors');
})

app.listen(3000);