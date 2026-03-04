require("../utils/loadEnv");
const { Client } = require("pg");

const SQL = `
  DROP TABLE IF EXISTS users, messages;  

  CREATE TABLE 
    users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(64) UNIQUE,
      password CHAR(60),
      first_name VARCHAR(64),
      last_name VARCHAR(64),
      is_member BOOLEAN DEFAULT FALSE,
      is_admin BOOLEAN DEFAULT FALSE
    );

  CREATE TABLE 
    messages (
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

  INSERT INTO users (username, password, first_name, last_name, is_member, is_admin) 
  VALUES 
    ('a', '$2a$12$6L1wlJo1iwxNa79wLc/QFe2UxjJ7V2i76UXzgmf00N/8QpsGDT/Ti', 'Alex', 'Rivera', true, true),
    ('arch_admin', '$2a$12$qhzP7iclMPWq/rQiQcKjhus66lQbXkQfVC9nrJLtXp1GM6gL5s0R6', 'Sam', 'Taylor', true, false),
    ('cpp_fan', '$2a$12$da92ba.cpTNjA9QtZ7pR4eyn6DqZXvgPK5suKXzHqoJcJ2WKWCZju', 'Jordan', 'Lee', false, false),
    ('ui_wizard', '$2a$12$VoEd5t.eAm/J3aiuEKmjJ.i/f7DzHayZjt1nNHiTfeA6H2t.pCPj6', 'Casey', 'Smith', true, false);

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
