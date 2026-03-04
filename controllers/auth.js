const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validateSignUp, validateLogin } = require("./validation/users");
const { loggedIn, loggedOut } = require("./common");
const { renderWithErrors } = require("./validation/common");

module.exports.getSignUp = [
  loggedOut,
  async (req, res) => {
    res.render("sign-up");
  },
];

module.exports.postSignUp = [
  loggedOut,
  validateSignUp,
  renderWithErrors("sign-up"),
  async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username, hashedPassword, firstName, lastName);
    res.redirect("/");
  },
];

module.exports.getLogin = [
  loggedOut,
  async (req, res) => {
    res.render("login");
  },
];

module.exports.postLogin = [
  loggedOut,
  validateLogin,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
];

module.exports.getLogout = [
  loggedIn,
  async (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];

module.exports.getMembership = [
  loggedIn,
  (req, res, next) => {
    if (req.user.is_member) {
      return res.redirect("/");
    }
    return next();
  },
  (req, res) => res.render("membership"),
];

module.exports.postMembership = [
  loggedIn,
  async (req, res) => {
    if (req.body.secret === process.env.MEMBERSHIP_SECRET) {
      await db.makeUserMember(req.user.id);
    }
    res.redirect("/");
  },
];
