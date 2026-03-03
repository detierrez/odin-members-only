const db = require("../db/queries");
const bcrypt = require("bcryptjs");

module.exports.getSignUp = [
  async (req, res) => {
    res.render("sign-up");
  },
];

module.exports.postSignUp = [
  async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.createUser(username, hashedPassword, firstName, lastName);
    res.redirect("/");
  },
];

module.exports;
