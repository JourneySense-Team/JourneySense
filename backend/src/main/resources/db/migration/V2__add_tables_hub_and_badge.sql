-- Create hub table
CREATE TABLE hubs (
                     id UUID PRIMARY KEY,
                     name VARCHAR(255) NOT NULL DEFAULT '',
                     description VARCHAR(255) NOT NULL DEFAULT ''
);

-- Create badge table
CREATE TABLE badges (
                       id UUID PRIMARY KEY,
                       title VARCHAR(255) NOT NULL DEFAULT '',
                       description VARCHAR(255) NOT NULL DEFAULT '',
                       reward_experience INT NOT NULL DEFAULT 0
);