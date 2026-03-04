module.exports.loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.loggedOut = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports.admin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) return res.redirect("/");
  next();
};
