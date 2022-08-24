const express = require('express');
const nunjucks = require("nunjucks");
const path = require('path');

const router = require('./routes.js')

const app = express()

// Configuramos formularios
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Configuramos archivos estáticos
app.use(express.static('public'))
// app.use(express.static('node_modules/bootstrap/dist'))

// Configuramos Nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: false,
  watch: true,
});

// Importamos las rutas
app.use(router)

// Ruta por defecto
app.get('*', (req, res) => {
  res.send('Ruta no implementada')
})

app.listen(3000, () => console.log('Servidor ejecutando en puerto 3000'))
