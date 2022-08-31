const pool = require('./pool.js')

async function create_table () {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  await client.query(`
    create table if not exists panoramas (
      id serial primary key,
      name varchar(255) not null,
      image varchar(255) not null
    )
  `)

  // 3. Devuelvo el cliente al pool
  client.release()
}
create_table()


async function get_panoramas () {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  const { rows } = await client.query(
    `select * from panoramas`
  )

  // 3. Devuelvo el cliente al pool
  client.release()

  // 4. retorno el primer usuario, en caso de que exista
  return rows
}

async function create_panorama (name, image) {
  // 1. Solicito un 'cliente' al pool de conexiones
  const client = await pool.connect()

  // 2. Ejecuto la consulta SQL (me traigo un array de arrays)
  await client.query(
    `insert into panoramas (name, image) values ($1, $2)`,
    [name, image]
  )

  // 3. Devuelvo el cliente al pool
  client.release()
}

module.exports = { create_panorama, get_panoramas }