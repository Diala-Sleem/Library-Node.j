exports.getPageAbout = (req, res, next) => {
  res.render("about", { verifyUser: req.session.userId });
};
