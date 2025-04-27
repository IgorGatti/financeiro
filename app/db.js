const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  user: 'myuser',
  password: 'mypassword',
  database: 'myapp',
  port: 5432,
});

module.exports = pool;