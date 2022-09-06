const authModel = require("../models/authModel");

exports.getRegisterPage = (req, res, next) => {
  res.render("register");
};

exports.postRegisterData = (req, res, next) => {

  authModel
    .registerFunctionModel(req.body.fullName, req.body.email, req.body.password)
    .then((user) => {
      res.redirect("/login");
    })
    .catch((msg) => {
      console.log(msg);
    });
};
