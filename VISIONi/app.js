const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('public'));

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

app.listen(3000);