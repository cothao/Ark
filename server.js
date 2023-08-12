const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("static"));
app.use(express.static("static/js"));
app.use(express.static("/"));
app.use(express.static("public"));
app.use(express.static("public/js"));
app.use("/", express.static("public"));
app.use(express.static("/node_modules"));
app.use(express.static("/node_modules/phaser"));
app.use("/", express.static(path.join(__dirname, "./")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(1010, () => {
  console.log("listening on yo mama");
});
