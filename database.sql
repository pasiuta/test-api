    create TABLE users(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email citext UNIQUE,
      phone text,
      password varchar(255) not null
    );


