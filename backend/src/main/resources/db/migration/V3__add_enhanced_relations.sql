-- Alter hubs table to add columns from the Hub entity
ALTER TABLE hubs
    ADD COLUMN is_private BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN password VARCHAR(255);

-- This table is for the @ElementCollection of tags in the Hub entity
CREATE TABLE hub_tags (
    hub_id UUID NOT NULL,
    tag VARCHAR(255),
    CONSTRAINT fk_hub_tags_hub FOREIGN KEY (hub_id) REFERENCES hubs(id) ON DELETE CASCADE
);

-- Create hub_memberships table based on HubMembership entity
CREATE TABLE hub_memberships (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    hub_id UUID NOT NULL,
    join_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_hub_memberships_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_hub_memberships_hub FOREIGN KEY (hub_id) REFERENCES hubs(id) ON DELETE CASCADE,
    UNIQUE (user_id, hub_id)
);

-- Create posts table based on Post entity
CREATE TABLE posts (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    type VARCHAR(255) NOT NULL,
    file_url VARCHAR(255),
    created_at TIMESTAMP,
    is_teacher_endorsed BOOLEAN DEFAULT false,
    user_id UUID,
    hub_id UUID,
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_posts_hub FOREIGN KEY (hub_id) REFERENCES hubs(id) ON DELETE CASCADE
);

-- Create comments table based on Comment entity
CREATE TABLE comments (
    id UUID PRIMARY KEY,
    text VARCHAR(1000) NOT NULL,
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    created_at TIMESTAMP,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Create user_badges table based on UserBadge entity
CREATE TABLE user_badges (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    badge_id UUID NOT NULL,
    date_acquired TIMESTAMP NOT NULL,
    CONSTRAINT fk_user_badges_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_badges_badge FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE(user_id, badge_id)
);

-- Create friendships table based on Friendship entity
CREATE TABLE friendships (
    id UUID PRIMARY KEY,
    requester_id UUID NOT NULL,
    addressee_id UUID NOT NULL,
    status VARCHAR(255),
    created_at TIMESTAMP,
    CONSTRAINT fk_friendships_requester FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_friendships_addressee FOREIGN KEY (addressee_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (requester_id <> addressee_id),
    UNIQUE (requester_id, addressee_id)
);