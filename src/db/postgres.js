import pkg from 'pg';

const { Pool } = pkg;

const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'css1441',
  database: 'shortly'
});

export default connection;
