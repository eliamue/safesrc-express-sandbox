DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS usstates CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS categories;

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
      number VARCHAR(20) NOT NULL,
      number2 VARCHAR(20),
      email VARCHAR(256),
      website TEXT,
      category TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      subcategory TEXT
);

CREATE TABLE usstates (
      id SERIAL PRIMARY KEY NOT NULL REFERENCES resources(state_id),
      usstate TEXT NOT NULL
);

CREATE TABLE cities (
      id SERIAL PRIMARY KEY NOT NULL REFERENCES resources(city_id),
      city TEXT NOT NULL,
      state_id INTEGER NOT NULL REFERENCES usstates(id)
);

CREATE TABLE categories (
      id SERIAL PRIMARY KEY NOT NULL REFERENCES resources(category_id),
      category TEXT NOT NULL
);