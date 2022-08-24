const { DataTypes } = require('sequelize');
const db = require('./conection.js')

const Tipo = db.define('tipo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true })


const Vehiculo = db.define('vehiculo', {
  patente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true })

Tipo.hasMany(Vehiculo)
Vehiculo.belongsTo(Tipo)

try {
  db.sync()
} catch (err) {
  console.log(`Error en la sicnronizacion`, err);
}

module.exports = { Tipo, Vehiculo }