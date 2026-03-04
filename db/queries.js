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

module.exports.getUserById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id=$1;
    `,
    [id],
  );

  return rows[0];
};

module.exports.getUserByUsername = async (username) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM users
    WHERE username=$1;
    `,
    [username],
  );

  return rows[0];
};

module.exports.makeUserMember = async (id) => {
  await pool.query(
    `
    UPDATE users
    SET is_member=TRUE
    WHERE id=$1
    `,
    [id],
  );
};

module.exports.makeUserAdmin = async (id) => {
  await pool.query(
    `
    UPDATE users
    SET is_admin=TRUE
    WHERE id=$1
    `,
    [id],
  );
};

module.exports.createMessage = async (userId, title, text) => {
  await pool.query(
    `
    INSERT INTO messages
      (user_id, date, title, text)
    VALUES
      ($1, now(), $2, $3);
    `,
    [userId, title, text],
  );
};

module.exports.getMessages = async () => {
  const { rows } = await pool.query(
    `
    SELECT messages.id as id, username, date, title, text
    FROM users, messages
    WHERE users.id=messages.user_id;
    `,
  );

  return rows;
};

module.exports.deleteMessage = async (id) => {
  await pool.query(
    `
    DELETE FROM messages
    WHERE id=$1;
    `,
    [id],
  );
};
