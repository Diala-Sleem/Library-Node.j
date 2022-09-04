const express = require("express");
const app = express();
const path = require("path");
//....................... static file ............................
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");
//----------------------------------------------------------------

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/contact", (req, res, next) => {
  res.render("contact");
});

app.get("/products", (req, res, next) => {
  res.render("products");
});

//----------------------------------------------------------------

app.listen(5000, () => console.log("app run on port 5000"));
