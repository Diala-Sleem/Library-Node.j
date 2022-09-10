exports.isAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.isNotAuth = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    next();
  }
};
