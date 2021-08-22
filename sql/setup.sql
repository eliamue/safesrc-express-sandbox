DROP TABLE IF EXISTS resources;

 CREATE TABLE resources (
      id SERIAL PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      address TEXT,
      city TEXT NOT NULL,
      city_id INTEGER NOT NULL,
      zip INTEGER,
      county TEXT,
      usstate TEXT NOT NULL,
      state_id INTEGER NOT NULL,
      number VARCHAR(14) NOT NULL,
      number2 VARCHAR(14),
      email VARCHAR(256),
      website TEXT,
      category TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      subcategory TEXT
);