import pool from '../utils/pool.js';

export default class Resources {
  id;
  name;
  address;
  city;
  city_id;
  county;
  zip;
  usstate;
  state_id;
  number;
  number2;
  email;
  website;
  category;
  category_id;
  subcategory;

  constructor(row) {
      this.id = row.id;
      this.name = row.name,
      this.address = row.address,
      this.city_id = row.city_id,
      this.city = row.city,
      this.zip = row.zip,
      this.county = row.county,
      this.state_id = row.state_id,
      this.usstate = row.usstate,
      this.number = row.number,
      this.number2 = row.number2,
      this.email = row.email,
      this.website = row.website,
      this.category_id = row.category_id,
      this.category = row.category,
      this.subcategory = row.subcategory
  }

  static async insert(resource) {
    const { rows } = await pool.query(
      `
      INSERT INTO resources (name, address, city, city_id, county, zip, usstate, state_id, number, number2, email, website, category, category_id, subcategory)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        resource.name,
        resource.address,
        resource.city,
        resource.city_id,
        resource.county,
        resource.zip,
        resource.usstate,
        resource.state_id,
        resource.number,
        resource.number2,
        resource.email,
        resource.website,
        resource.category,
        resource.category_id,
        resource.subcategory
      ]
    );
    return new Resources(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM resources');

    return rows.map((row) => new Resources(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM resources WHERE id=$1', [
      id,
    ]);
    return new Resources(rows[0]);
  }

  static async update(
    id, { name, address, city, city_id, county, zip, usstate, state_id, number, number2, email, website, category, category_id, subcategory }) {
    const existingResource = await Resources.getById(id);

    const newName = name ?? existingResource.name;
    const newAddress = address ?? existingResource.address;
    const newCity = city ?? existingResource.city;
    const newCity_id = city_id ?? existingResource.city_id;
    const newUSState = usstate ?? existingResource.usstate;
    const newState_id = state_id ?? existingResource.state_id;
    const newZip = zip ?? existingResource.zip;
    const newCounty = county ?? existingResource.county;
    const newNumber = number ?? existingResource.number;
    const newNumber2 = number2 ?? existingResource.number2;
    const newEmail = email ?? existingResource.email;
    const newWebsite = website ?? existingResource.website;
    const newCategory = category ?? existingResource.category;
    const newCategory_id = category_id ?? existingResource.category_id;
    const newSubcategory = subcategory ?? existingResource.subcategory;

    const { rows } = await pool.query(
      'UPDATE Resources SET name=$1, address=$2, city=$3, city_id=$4, usstate=$5, state_id=$6, zip=$7, county=$8, number=$9, number2=$10, email=$11, website=$12, category=$13, category_id=$14, subcategory=$15 WHERE id=$16 RETURNING *',
      [
        newName,
        newAddress,
        newCity,
        newCity_id,
        newUSState,
        newState_id,
        newZip,
        newCounty,
        newNumber,
        newNumber2,
        newEmail,
        newWebsite,
        newCategory,
        newCategory_id,
        newSubcategory,
        id,
      ]
    );
    return new Resources(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM resources WHERE id=$1 RETURNING *',
      [id]
    );
    return new Resources(rows[0]);
  }
}
