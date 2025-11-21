CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create hub table
CREATE TABLE hubs (
                     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                     name VARCHAR(255) NOT NULL DEFAULT '',
                     description VARCHAR(255) NOT NULL DEFAULT ''
);

-- Create badge table
CREATE TABLE badges (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       title VARCHAR(255) NOT NULL DEFAULT '',
                       description VARCHAR(255) NOT NULL DEFAULT ''
);