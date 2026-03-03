const db = require("../db/queries");

module.exports.getIndex = [
  async (req, res) => {
    const [users, posts] = await Promise.all([db.getUsers(), db.getPosts()]);
    
    res.render("index", { users, posts });
  },
];
