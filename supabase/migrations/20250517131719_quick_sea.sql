/*
  # Fix authentication policies

  1. Changes
    - Add INSERT policies for users table
    - Add INSERT policies for heroes table
    - Add INSERT policies for battles table
    - Add UPDATE policies for users table
    - Add UPDATE policies for heroes table

  2. Security
    - Users can only insert/update their own data
    - Heroes can only be created/updated by their owners
    - Battles can be created by authenticated users
*/

-- Users table policies
CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Heroes table policies
CREATE POLICY "Users can create their own heroes"
  ON heroes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own heroes"
  ON heroes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Battles table policies
CREATE POLICY "Users can create battles"
  ON battles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = attacker_id);

CREATE POLICY "Users can update battles"
  ON battles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = attacker_id)
  WITH CHECK (auth.uid() = attacker_id);