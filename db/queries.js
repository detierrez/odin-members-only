const format = require("pg-format");
const pool = require("./pool");

module.exports.getUsers = async () => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM users;
    `,
  );

  return rows;
};

module.exports.createUser = async (username, password, firstName, lastName) => {
  console.log(username, password, firstName, lastName);

  await pool.query(
    `
    INSERT INTO users
      (username, password, first_name, last_name)
    VALUES
      ($1, $2, $3, $4);
    `,
    [username, password, firstName, lastName],
  );
};

module.exports.getPosts = async () => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM posts;
    `,
  );

  return rows;
};