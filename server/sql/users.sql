CREATE TABLE IF NOT EXISTS users (
  id serial,
  username varchar(64) NOT NULL,
  email varchar(64) NOT NULL,
  password varchar(64) NOT NULL
);
