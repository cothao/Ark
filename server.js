const exp = require("constants");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("static"));
app.use(express.static("static/js"));
app.use(express.static("/"));
app.use(express.static("public"));
app.use(express.static("public/js"));
app.use(express.static("public/js/components"));
app.use('/',express.static('public/js/'))

app.use('/',express.static('public/js/components/'))
app.use("/", express.static("public"));
app.use(express.static("/node_modules"));
app.use(express.static("/node_modules/phaser"));
app.use("/", express.static(path.join(__dirname, "./")));
app.use("/public/", express.static(path.join(__dirname, "./public")));
app.use("/public/js/", express.static(path.join(__dirname, "./public/js/")));
app.use("/public/js/components/", express.static(path.join(__dirname, "./public/js/components/")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(1010, () => {
  console.log("listening on yo mama");
});
