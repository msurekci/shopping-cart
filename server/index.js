const express = require("express");
const cors = require("cors");
const app = express();

const itemList = require("../itemList.json");

app.use(cors());
app.get("/items", function(req, res) {
  res.json(itemList);
});

app.listen(3001);
