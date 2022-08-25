const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()

// se configura uso de sesiones
app.use(session({secret: 'hmit'}))

// se configura nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});

app.get('/', (req, res) => {
  const letras = req.session.letras || ''
  res.send(`Letras: ${letras}`)
})

app.get('/add', (req, res) => {
  // primero me traigo la variable de session
  let letras = req.session.letras || ''
  // modifico la variable
  const letra = req.query.letra
  letras += letra
  // vuelvo a guardar la variable en session
  req.session.letras = letras

  res.send(`Letras: ${letras}`)
})

app.get('/random', (req, res) => {
  const palabra = Math.random().toString(36).substr(2,24);
  
  if (req.session.intentos == undefined) {
    req.session.intentos = 0
  }

  req.session.intentos++

  const datos = {
    intentos: req.session.intentos,
    palabra
  }

  res.render('random.html', datos)
})

app.get('/random/reset', (req, res) => {
  req.session.intentos = 0
  res.redirect('/random')
})

app.listen(3000, () => {
  console.log('servidor ejecutando en el puerto 3000');
})