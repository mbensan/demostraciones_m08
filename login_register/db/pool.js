const { Pool } = require('pg')

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'login_register',
  password: '1005',
  min: 3,
  max: 6,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
  port: 5432
}
const pool = new Pool(config)

module.exports = pool;