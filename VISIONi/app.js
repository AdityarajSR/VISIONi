const path = require("path");

const express = require("express");

const app = express();

const db = require("./data/database");

const uuid = require("uuid");

const session = require("express-session");

const mongodbStore = require('connect-mongodb-session');

const MongoDBStore = mongodbStore(session);

const sessionStore = new MongoDBStore({
    uri :'mongodb+srv://CONNECtIt:CONNECtIt@cluster0.jzll7mx.mongodb.net/?retryWrites=true&w=majority',
    databaseName : 'auth-demo',
    collection : 'sessions'
  })

const defroute = require("./routes/default_routes");
const tracroute = require("./routes/tracroute");
const harroute = require("./routes/harroute");
const demoRoutes = require("./routes/demo");

app.set("views", path.join(__dirname, "views"));
// console.log(path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret : 'VISIONi',
  resave : false,
  saveUninitialized : false,
  store : sessionStore
}));

app.use(demoRoutes);
app.use("/", defroute);
app.use("/", tracroute);
app.use("/", harroute);


// app.use(function (req, res) {
//   res.status(404).render("404");
// });

// app.use(function (error, req, res, next) {
//   res.status(500).render("500");
// });

db.connectToDatabase().then(function () {
  app.listen(3000);
});
