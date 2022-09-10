exports.getPageContact = (req, res, next) => {
    res.render("contact", { verifyUser: req.session.userId });
};