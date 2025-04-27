const pool = require('../db');

class BaseModel {
  constructor(table) {
    this.table = table;
  }

  async findAll() {
    const result = await pool.query(`SELECT * FROM ${this.table} ORDER BY id`);
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async add(fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders})`;
    return await pool.query(query, values);
  }

  async update(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setters = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    const query = `UPDATE ${this.table} SET ${setters} WHERE id = $${keys.length + 1}`;
    return await pool.query(query, [...values, id]);
  }

  async delete(id) {
    return await pool.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  }
}

module.exports = BaseModel;