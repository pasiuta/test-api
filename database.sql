    create TABLE users(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email citext UNIQUE,
      phone text
--  password TEXT NOT NULL
    );