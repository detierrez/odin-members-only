const db = require("../db/queries");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validateUser, validateLogIn } = require("./validation/users");

module.exports.getSignUp = [
  async (req, res) => {
    res.render("sign-up");
  },
];

module.exports.postSignUp = [
  validateUser,
  async (req, res, next) => {
    if (res.locals.hasErrors) next();

    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username, hashedPassword, firstName, lastName);
    res.redirect("/");
  },
  async (req, res) => {
    const { username, firstName, lastName } = req.body;
    res.render("sign-up", { username, firstName, lastName });
  },
];

module.exports.getLogIn = [
  async (req, res) => {
    res.render("log-in");
  },
];

module.exports.postLogIn = [
  validateLogIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  }),
];

module.exports.getLogOut = [
  async (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];

module.exports.getMembership = (req, res) => res.render("membership");

module.exports.postMembership = async (req, res) => {
  if (req.body.secret === process.env.MEMBERSHIP_SECRET) {
    await db.makeUserMember(req.user.id);
  }
  res.redirect("/");
};

module.exports;
