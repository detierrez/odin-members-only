const format = require("pg-format");
const pool = require("./pool");

module.exports.hasUsername = async (username) => {
  const { rowCount } = await pool.query(
    `
    SELECT *
    FROM users
    WHERE username=$1;
    `,
    [username],
  );
  console.log(rowCount >= 1)

  return rowCount >= 1;
};

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
