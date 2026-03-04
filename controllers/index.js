const db = require("../db/queries");

module.exports.getIndex = [
  async (req, res) => {
    const [users, messages] = await Promise.all([db.getUsers(), db.getMessages()]);
    
    res.render("index", { users, messages });
  },
];
