import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Qwerty00',
  database: 'giftsdb',
});

export default pool;
