const db = require("../db/queries");
const { validateMessage } = require("./validation/messages");
const { loggedIn } = require("./common");
const { renderWithErrors } = require("./validation/common");

module.exports.getNewMessage = [
  loggedIn,
  async (req, res) => {
    res.render("message-form");
  },
];

module.exports.postNewMessage = [
  loggedIn,
  validateMessage,
  renderWithErrors("message-form"),
  async (req, res, next) => {
    const { title, text } = req.body;
    await db.createMessage(req.user.id, title, text);
    res.redirect("/");
  },
];
