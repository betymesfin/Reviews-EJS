const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You can't access that page before logon.");
  res.redirect("/");
};

module.exports = authMiddleware;
