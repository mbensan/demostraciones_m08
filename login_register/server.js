const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()

// se configura uso de sesiones
app.use(session({secret: 'hmit'}))

// se configuran archivos estáticos
app.use(express.static('./node_modules/bootstrap/dist'))

// se configura nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});

// se configura uso de formularios
app.use(express.urlencoded({extended: true}))

// se traen las rutas
app.use(require('./routes/auth'))
app.use(require('./routes/routes'))


app.listen(3000, () => {
  console.log('servidor ejecutando en el puerto 3000');
})
