CREATE TABLE users
(
    id         UUID DEFAULT gen_random_uuid() NOT NULL,
    first_name VARCHAR(255)                   NOT NULL,
    last_name  VARCHAR(255)                   NOT NULL,
    username   VARCHAR(255)                   NOT NULL,
    email      VARCHAR(255)                   NOT NULL,
    password   VARCHAR(255)                   NOT NULL,
    level      INTEGER                        NOT NULL,
    experience INTEGER                        NOT NULL,
    role       VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE users
    ADD CONSTRAINT uc_users_email UNIQUE (email);

ALTER TABLE users
    ADD CONSTRAINT uc_users_username UNIQUE (username);