const express = require("express");
const app = express();
const path = require("path");
//.........import the router...................
const homeBookRoute = require("./routers/homeBookRoute");
const booksBookRoute = require("./routers/booksBookRoute");
const authRoute = require("./routers/authRouter")

//....................... static file ............................
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");
//----------------------------------------------------------------

app.use("/", homeBookRoute);
app.use("/books", booksBookRoute);
app.use("/", authRoute);

// app.get("/books/details/:id", (req, res, next) => {
//   let id = req.params;
//   res.render("details.id");
// });

// app.get("/about", (req, res, next) => {
//   res.render("about");
// });

// app.get("/contact", (req, res, next) => {
//   res.render("contact");
// });

app.get("/login", (req, res, next) => {
  res.render("login");
});


//----------------------------------------------------------------

app.listen(5000, () => console.log("app run on port 5000"));
