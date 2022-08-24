const { Tipo, Vehiculo } = require('./models.js')

async function crearTipo (nombre) {
  // primero hacemos la valición de los campos
  if (nombre.trim() == '') {
    throw 'El nombre no puede ser vacío'
  }
  // después ejecutamos las sentencias SQL
  await Tipo.create({ nombre })
}

module.exports = { crearTipo }