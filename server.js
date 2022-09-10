const express = require("express");
const app = express();
const path = require("path");
//----------------------connect flash to send the error message to the client------------------------
const flash = require("connect-flash");
//------------session and connect mongodb session used to store data on the browser
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//.........import the router...................
const homeBookRoute = require("./routers/homeBookRouter");
const booksBookRoute = require("./routers/booksBookRouter");
const authRoute = require("./routers/authRouter");
const contactRoute = require("./routers/contactRouter");
const aboutRoute = require("./routers/aboutRouter");
//....................... static file ............................
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");
//-----------------------------create store for Sessions-----------------------------------
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
//-------use flash as middleware
app.use(flash());
//------------------------

app.use("/", homeBookRoute);
app.use("/", booksBookRoute);
app.use("/", authRoute);
app.use("/", contactRoute);
app.use("/", aboutRoute);

app.get("/admin", (req, res, next) => {
  res.render("admin/index.ejs");
});

app.get("/admin/charts", (req, res, next) => {
  res.render("admin/charts.ejs");
});

app.get("/admin/cards", (req, res, next) => {
  res.render("admin/cards.ejs");
});


app.get("/admin/tables", (req, res, next) => {
  res.render("admin/tables.ejs");
});




//----------------------------------------------------------------

app.listen(5000, () => console.log("app run on port 5000"));
