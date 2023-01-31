const path = require("path");

const express = require("express");

const app = express();

const uuid = require("uuid");

const defroute = require("./routes/default_routes");
const tracroute = require("./routes/tracroute");
const harroute = require("./routes/harroute");

app.set("views", path.join(__dirname, "views"));
// console.log(path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use('/', defroute);
app.use('/', tracroute);
app.use('/', harroute);

app.use(function(req, res){
    res.status(404).render('404');
});

// app.use(function(error, req, res, next){
//     res.status(500).render('500');
// });

app.listen(3000);
