-- Table: forging_materials
CREATE TABLE IF NOT EXISTS forging_materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  key VARCHAR(32) NOT NULL UNIQUE,
  temp_min INTEGER NOT NULL,
  temp_max INTEGER NOT NULL,
  resistance FLOAT NOT NULL
);

INSERT INTO forging_materials (name, key, temp_min, temp_max, resistance) VALUES
  ('Acero al Carbono', 'acero', 1000, 1300, 1.0),
  ('Aluminio', 'aluminio', 400, 600, 0.3),
  ('Cobre', 'cobre', 700, 1000, 0.5),
  ('Titanio', 'titanio', 900, 1200, 1.5),
  ('Latón', 'laton', 600, 900, 0.4),
  ('Níquel', 'niquel', 900, 1200, 1.2);

-- Table: forging_processes
CREATE TABLE IF NOT EXISTS forging_processes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  key VARCHAR(32) NOT NULL UNIQUE,
  efficiency FLOAT NOT NULL,
  uniformity FLOAT NOT NULL
);

INSERT INTO forging_processes (name, key, efficiency, uniformity) VALUES
  ('Forjado Libre', 'libre', 0.7, 0.6),
  ('Forjado en Matriz', 'matriz', 0.9, 0.9),
  ('Estampado', 'estampado', 0.95, 0.95),
  ('Forjado Isotérmico', 'isotermico', 0.85, 0.8);

-- You can run this file in Supabase SQL editor to create and populate the tables.
