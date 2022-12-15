const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/equipments", function (req, res) {
  res.render("equipments");
});

module.exports = router;