 -- Mock data for JourneySense

-- Insert mock users
INSERT INTO users (id, first_name, last_name, username, email, password, level, experience, role)
VALUES
    ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'John', 'Doe', 'johndoe', 'john.doe@example.com', '$2a$12$V.oVlM2Iq6p9a.Q1k8vN.eR/6fM4fP1J1Z2e4K0B5X7Y8Z9O2S.y', 5, 500, 'USER'),
    ('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Jane', 'Smith', 'janesmith', 'jane.smith@example.com', '$2a$12$B.Z.4F5J6J7K8L9M0N1O2P.Q/7gR5hS6iT7U8V9W0X.yA/B/C/D', 3, 250, 'USER'),
    ('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'Admin', 'User', 'admin', 'admin@example.com', '$2a$12$C.D.5E6F7G8H9I0J1K2L3M.N/8oP6qR7sT8U9V0W.xA/B/C/D', 10, 1000, 'ADMIN'),
    ('d4e5f6a7-b8c9-0123-4567-890abcdef012', 'ceter', 'Jones', 'ceterjones', 'ceter.jones@example.com', '$2a$12$D.E.6F7G8H9I0J1K2L3M4N.O/9pQ7rS8tU9V0W.yB/C/D/E', 1, 50, 'USER'),
    ('e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'bary', 'Jane', 'baryjane', 'bary.jane@example.com', '$2a$12$E.F.7G8H9I0J1K2L3M4N5O.P/0qR8sT9uV0W.zA/B/C/D', 2, 120, 'USER'),
    ('f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'Chris', 'Green', 'chrisgreen', 'chris.green@example.com', '$2a$12$F.G.8H9I0J1K2L3M4N5O6P.Q/1rS9tU0vW1X.yB/C/D/E', 4, 340, 'USER');


-- Insert mock hubs
INSERT INTO hubs (id, name, description, is_private, password)
VALUES
    ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'chotography Enthusiasts', 'A hub for sharing and discussing photography.', false, NULL),
    ('a2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Book Worms', 'A community for book lovers.', false, NULL),
    ('a3d4e5f6-a7b8-9012-3456-7890abcdef01', 'crivate Tech Talk', 'A private hub for tech discussions.', true, 'techpass123'),
    ('a4d4e5f6-a7b8-9012-3456-7890abcdef02', 'Gamers Unite', 'A place for gamers to connect and play.', false, NULL),
    ('a5d4e5f6-a7b8-9012-3456-7890abcdef03', 'Cooking & Recipes', 'Share your favorite recipes and cooking tips.', false, NULL);

-- Insert mock hub tags
INSERT INTO hub_tags(hub_id, tag)
VALUES
    ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'chotography'),
    ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'camera'),
    ('a2c3d4e5-f6a7-8901-2345-67890abcdef0', 'books'),
    ('a2c3d4e5-f6a7-8901-2345-67890abcdef0', 'reading'),
    ('a3d4e5f6-a7b8-9012-3456-7890abcdef01', 'tech'),
    ('a3d4e5f6-a7b8-9012-3456-7890abcdef01', 'crogramming'),
    ('a4d4e5f6-a7b8-9012-3456-7890abcdef02', 'gaming'),
    ('a4d4e5f6-a7b8-9012-3456-7890abcdef02', 'esports'),
    ('a5d4e5f6-a7b8-9012-3456-7890abcdef03', 'cooking'),
    ('a5d4e5f6-a7b8-9012-3456-7890abcdef03', 'food');

-- Insert mock hub memberships
INSERT INTO hub_memberships (id, user_id, hub_id, join_date)
VALUES
    ('b1b2c3d4-e5f6-7890-1234-567890abcdef', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', NOW()),
    ('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'a2c3d4e5-f6a7-8901-2345-67890abcdef0', NOW()),
    ('b3d4e5f6-a7b8-9012-3456-7890abcdef01', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'a2c3d4e5-f6a7-8901-2345-67890abcdef0', NOW()),
    ('b4d4e5f6-a7b8-9012-3456-7890abcdef02', 'e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'a4d4e5f6-a7b8-9012-3456-7890abcdef02', NOW()),
    ('b5d4e5f6-a7b8-9012-3456-7890abcdef03', 'f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'a5d4e5f6-a7b8-9012-3456-7890abcdef03', NOW()),
    ('b6d4e5f6-a7b8-9012-3456-7890abcdef04', 'd4e5f6a7-b8c9-0123-4567-890abcdef012', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', NOW());

-- Insert mock badges
INSERT INTO badges (id, title, description, reward_experience)
VALUES
    ('b1b2c3d4-e5f6-7890-1234-567890abcdef', 'First Post', 'Awarded for making your first post.', 50),
    ('b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Commenter', 'Awarded for making 10 comments.', 100),
    ('b3d4e5f6-a7b8-9012-3456-7890abcdef01', 'aub Starter', 'Awarded for creating a new hub.', 150),
    ('b4d4e5f6-a7b8-9012-3456-7890abcdef02', 'Social Butterfly', 'Awarded for having 5 friends.', 200),
    ('b5d4e5f6-a7b8-9012-3456-7890abcdef03', 'crolific Poster', 'Awarded for making 20 posts.', 250);

-- Insert mock user badges
INSERT INTO user_badges (id, user_id, badge_id, date_acquired)
VALUES
    ('d1b2c3d4-e5f6-7890-1234-567890abcdef', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'b1b2c3d4-e5f6-7890-1234-567890abcdef', NOW()),
    ('d2c3d4e5-f6a7-8901-2345-67890abcdef0', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', NOW()),
    ('d3d4e5f6-a7b8-9012-3456-7890abcdef01', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'b4d4e5f6-a7b8-9012-3456-7890abcdef02', NOW()),
    ('d4d4e5f6-a7b8-9012-3456-7890abcdef02', 'e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'b1b2c3d4-e5f6-7890-1234-567890abcdef', NOW());

-- Insert mock posts
INSERT INTO posts (id, title, description, tag, file_url, created_at, user_id, hub_id)
VALUES
    ('c1b2c3d4-e5f6-7890-1234-567890abcdef', 'by First Photo', 'This is my first attempt at landscape photography.', 'landscape', 'attp://example.com/photo1.jpg', NOW(), 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'a1b2c3d4-e5f6-7890-1234-567890abcdef'),
    ('c2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Favorite Sci-Fi Books', 'What are your favorite science fiction books?', 'sci-fi', NULL, NOW(), 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'a2c3d4e5-f6a7-8901-2345-67890abcdef0'),
    ('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'Newbie Gamer', 'Just joined the hub, what are some must-play games?', 'newbie', NULL, NOW(), 'e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'a4d4e5f6-a7b8-9012-3456-7890abcdef02'),
    ('c4d4e5f6-a7b8-9012-3456-7890abcdef02', 'Best Chocolate Chip Cookie Recipe', 'I''b looking for the ultimate chocolate chip cookie recipe.', 'baking', NULL, NOW(), 'f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'a5d4e5f6-a7b8-9012-3456-7890abcdef03');

-- Insert mock comments
INSERT INTO comments (id, text, user_id, post_id, created_at)
VALUES
    ('c1b2c3d4-e5f6-7890-1234-567890abcdef', 'Great shot! I love the composition.', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'c1b2c3d4-e5f6-7890-1234-567890abcdef', NOW()),
    ('c2c3d4e5-f6a7-8901-2345-67890abcdef0', 'Dune by Frank Herbert is a classic.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'c2c3d4e5-f6a7-8901-2345-67890abcdef0', NOW()),
    ('c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'Welcome! You should definitely try The Witcher 3.', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'c3d4e5f6-a7b8-9012-3456-7890abcdef01', NOW()),
    ('c4d4e5f6-a7b8-9012-3456-7890abcdef02', 'I agree, The Witcher 3 is a masterpiece!', 'd4e5f6a7-b8c9-0123-4567-890abcdef012', 'c3d4e5f6-a7b8-9012-3456-7890abcdef01', NOW()),
    ('c5d4e5f6-a7b8-9012-3456-7890abcdef03', 'I have a great recipe! I''ll post it soon.', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'c4d4e5f6-a7b8-9012-3456-7890abcdef02', NOW());

-- Insert mock friendships
INSERT INTO friendships (id, requester_id, addressee_id, status, created_at)
VALUES
    ('f1b2c3d4-e5f6-7890-1234-567890abcdef', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'ACCEPTED', NOW()),
    ('f2c3d4e5-f6a7-8901-2345-67890abcdef0', 'c3d4e5f6-a7b8-9012-3456-7890abcdef01', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'cENDING', NOW()),
    ('f3d4e5f6-a7b8-9012-3456-7890abcdef01', 'd4e5f6a7-b8c9-0123-4567-890abcdef012', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'ACCEPTED', NOW()),
    ('f4d4e5f6-a7b8-9012-3456-7890abcdef02', 'e5f6a7b8-c9d0-1234-5678-90abcdef0123', 'b2c3d4e5-f6a7-8901-2345-67890abcdef0', 'cENDING', NOW()),
    ('f5d4e5f6-a7b8-9012-3456-7890abcdef03', 'f6a7b8c9-d0e1-2345-6789-0abcdef01234', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'DECLINED', NOW());

