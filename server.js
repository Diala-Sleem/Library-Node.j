const express = require("express");
const app = express();
const path = require("path");
//------------session and connect mongodb session used to store data on the browser 
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//.........import the router...................
const homeBookRoute = require("./routers/homeBookRoute");
const booksBookRoute = require("./routers/booksBookRoute");
const authRoute = require("./routers/authRouter")

//....................... static file ............................
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");
//-----------------------------create store-----------------------------------
var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/library",
  collection: "mySessions",
});

app.use(
  session({
    secret: "This is a secret key",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

//------------------------

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

// app.get("/login", (req, res, next) => {
//   res.render("login");
// });


//----------------------------------------------------------------

app.listen(5000, () => console.log("app run on port 5000"));
