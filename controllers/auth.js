const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { validateUser } = require("./validation/users");

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

module.exports.getMembership = (req, res) => res.render("membership");

module.exports.postMembership = async (req, res) => {
  const { secret } = req.body;
  if (secret === process.env.MEMBERSHIP_SECRET) {
    // TODO: use actual user in session
    const id = 5;
    await db.makeUserMember(id);
  }
  res.redirect("/");
};

module.exports;
