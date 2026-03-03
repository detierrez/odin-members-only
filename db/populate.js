require("../utils/loadEnv");
const { Client } = require("pg");

const SQL = `
  DROP TABLE IF EXISTS users, posts;  

  CREATE TABLE 
    users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(64) UNIQUE,
      password CHAR(60),
      firstname VARCHAR(64),
      lastname VARCHAR(64),
      isMember boolean,
      isAdmin boolean
    );

  CREATE TABLE 
    posts (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id INTEGER,
      title VARCHAR(64),
      date TIMESTAMPTZ,
      text VARCHAR(280),
      CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id) 
        ON DELETE CASCADE
    );

  INSERT INTO users (username, password, firstname, lastname, isMember, isAdmin) 
  VALUES 
    ('js_ninja', '5f4dcc3b5aa765d61d8327deb882cf99', 'Alex', 'Rivera', true, false),
    ('arch_admin', 'e10adc3949ba59abbe56e057f20f883e', 'Sam', 'Taylor', true, true),
    ('cpp_fan', 'd41d8cd98f00b204e9800998ecf8427e', 'Jordan', 'Lee', false, false),
    ('ui_wizard', '098f6bcd4621d373cade4e832627b4f6', 'Casey', 'Smith', true, false);

  INSERT INTO messages (user_id, title, date, text)
  VALUES
    (2, 'Welcome to the Board', '2026-03-01 09:00:00-03', 'Welcome everyone! Remember to check out the new e-commerce architecture guidelines before posting.'),
    (1, 'Express Routing Issue', '2026-03-01 14:30:00-03', 'Does anyone have tips on structuring routes in an Express backend? I am trying to keep the controllers clean.'),
    (3, 'Podman vs Docker', '2026-03-02 10:15:00-03', 'I have been using Podman lately for containerization and environment isolation. Highly recommend it over Docker for local dev.'),
    (4, 'Font Pairings', '2026-03-02 11:45:00-03', 'Struggling to find a good serif font to pair with Roboto for a clean UI design. Any suggestions?'),
    (1, 'Database Schema Feedback', '2026-03-02 16:20:00-03', 'Just dropped a new schema design in the main channel. Let me know if those foreign keys look solid or if I need more indexes.')
  ;
    `;

(async () => {
  try {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Seeding successful");
  } catch (error) {
    console.log(`${error}`);
    throw new Error();
  }
})();
