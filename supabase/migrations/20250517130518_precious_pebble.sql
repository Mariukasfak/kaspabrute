/*
  # Initial schema setup for Brute game

  1. New Tables
    - users
      - id (uuid, primary key)
      - username (text, unique)
      - health_point (int)
      - experience (int)
      - level_id (int)
      - left_fights (int)
      - created_at (timestamp)
    - heroes
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - strength (int)
      - agility (int)
      - speed (int)
      - hero_type (int)
    - weapons
      - id (uuid, primary key)
      - strength (int)
      - agility (int)
      - speed (int)
      - chance (int)
      - level_id (int)
    - user_weapons
      - user_id (uuid, references users)
      - weapon_id (uuid, references weapons)
      - primary key (user_id, weapon_id)
    - battles
      - id (uuid, primary key)
      - attacker_id (uuid, references users)
      - defender_id (uuid, references users)
      - winner_id (uuid, references users)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  health_point int DEFAULT 100,
  experience int DEFAULT 0,
  level_id int DEFAULT 1,
  left_fights int DEFAULT 3,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Heroes table
CREATE TABLE heroes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  strength int DEFAULT 10,
  agility int DEFAULT 10,
  speed int DEFAULT 10,
  hero_type int DEFAULT 1
);

ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Heroes can be read by authenticated users"
  ON heroes
  FOR SELECT
  TO authenticated
  USING (true);

-- Weapons table
CREATE TABLE weapons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  strength int DEFAULT 5,
  agility int DEFAULT 5,
  speed int DEFAULT 5,
  chance int DEFAULT 50,
  level_id int DEFAULT 1
);

ALTER TABLE weapons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Weapons can be read by authenticated users"
  ON weapons
  FOR SELECT
  TO authenticated
  USING (true);

-- User weapons junction table
CREATE TABLE user_weapons (
  user_id uuid REFERENCES users ON DELETE CASCADE,
  weapon_id uuid REFERENCES weapons ON DELETE CASCADE,
  PRIMARY KEY (user_id, weapon_id)
);

ALTER TABLE user_weapons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User weapons can be read by authenticated users"
  ON user_weapons
  FOR SELECT
  TO authenticated
  USING (true);

-- Battles table
CREATE TABLE battles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attacker_id uuid REFERENCES users ON DELETE CASCADE,
  defender_id uuid REFERENCES users ON DELETE CASCADE,
  winner_id uuid REFERENCES users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE battles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Battles can be read by authenticated users"
  ON battles
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert some initial weapons
INSERT INTO weapons (strength, agility, speed, chance, level_id) VALUES
  (8, 5, 3, 60, 1),
  (5, 8, 3, 60, 1),
  (3, 5, 8, 60, 1),
  (10, 7, 5, 40, 2),
  (7, 10, 5, 40, 2),
  (5, 7, 10, 40, 2);