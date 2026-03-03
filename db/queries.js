const format = require("pg-format");
const pool = require("./pool");

module.exports.getAllUsers = async () => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM users
    `,
  );
  return rows;
};
