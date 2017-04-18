BEGIN;

DROP TABLE IF EXISTS auth, lpop, current CASCADE;

CREATE TABLE lpop (
  id    SERIAL       PRIMARY KEY,
  name  VARCHAR(20)  NOT NULL,
  selected BOOLEAN
);

CREATE TABLE auth (
  id        SERIAL      PRIMARY KEY,
  username  VARCHAR(20) UNIQUE,
  password  VARCHAR(70) NOT NULL
);

CREATE TABLE current (
  id        SERIAL      PRIMARY KEY,
  name  VARCHAR(20) NOT NULL
);

INSERT INTO auth(username, password)
VALUES
('mentor', '$2a$10$JshaW9.JENpgZwoGwN.I7.Tx2vh.s3KNgsi3f6QU.DMYKtoVv8PIm');

INSERT INTO lpop(name)
VALUES
('finn'), ('oli'), ('jessica'), ('akin'), ('antonio'), ('lucy'), ('alexis'),
('yvonne'), ('piotr'), ('joey'), ('alice'), ('samatar'), ('philippa'), ('maja'),
('martha'), ('zooey');

INSERT INTO current(name)
VALUES
('finn');

COMMIT;
