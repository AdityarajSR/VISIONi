const fs = require("fs");

const path = require("path");

const express = require("express");

const app = express();

const uuid = require("uuid");

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/equipments", function (req, res) {
  res.render("equipments");
});

app.get("/harvesters", function (req, res) {
  const filePath = path.join(__dirname, "data", "harvesters.json");
  const hardata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(hardata);

  res.render("harvesters", {myhar : storeddata});
});

app.get("/harvesters/:id", function (req, res) {
  const harId = req.params.id;

  const filePath = path.join(__dirname, "data", "harvesters.json");
  const hardata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(hardata);

  for (const har of storeddata) {
    if (har.id === harId) {
      return res.render("harvester-detail", { myhar: har, rid: harId });
    }
  }

  res.status(404).render('404');
});

app.get("/tractors", function (req, res) {
  const filePath = path.join(__dirname, "data", "tractors.json");
  const tractordata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(tractordata);

  res.render("tractors", { mytrac: storeddata });
});

app.get("/tractors/:id", function (req, res) {
  // Each new page will be created automatically
  const tractorId = req.params.id;

  const filePath = path.join(__dirname, "data", "tractors.json");
  const tractordata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(tractordata);

  for (const tr of storeddata) {
    if (tr.id === tractorId) {
      return res.render("tractors-detail", { mytracis: tr, rid: tractorId });
    }
  }

//   More Optimized
  res.status(404).render('404');
//   res.render('404');      // KInd of inappropriate
});

app.get("/addharvester", function(req, res){
  res.render("addharvester");
});

app.get("/addtractor", function (req, res) {
  res.render("addtractor");
});

app.post("/addharvester", function(req, res){
  const hars = req.body;
  hars.id = uuid.v4();

  const filePath = path.join(__dirname, "data", "harvesters.json");
  const hardata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(hardata);

  storeddata.push(hars);

  fs.writeFileSync(filePath, JSON.stringify(storeddata));

  res.redirect("/harvesters");
})

app.post("/addtractor", function (req, res) {
  const tractors = req.body;
  tractors.id = uuid.v4();

  const filePath = path.join(__dirname, "data", "tractors.json");
  const tractordata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(tractordata);

  storeddata.push(tractors);

  fs.writeFileSync(filePath, JSON.stringify(storeddata));

  res.redirect("/tractors");
});


app.use(function(req, res){
    res.status(404).render('404');
});

app.use(function(error, req, res, next){
    res.status(500).render('500');
});

app.listen(3000);
