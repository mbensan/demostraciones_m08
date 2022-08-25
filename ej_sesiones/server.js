const { query } = require('express');
const express = require('express');
const session = require('express-session');

const app = express()

app.use(session({secret: 'hmit'}))

app.get('/', (req, res) => {
  const letras = req.session.letras || ''
  res.send(`Letras: ${letras}`)
})

app.get('/add', (req, res) => {
  // primero me traigo la variable de session
  let letras = req.session.letras || ''
  console.log(letras);
  // modifico la variable
  const letra = req.query.letra
  letras += letra
  // vuelvo a guardar la variable en session
  req.session.letras = letras

  res.send(`Letras: ${letras}`)
})

app.listen(3000, () => {
  console.log('servidor ejecutando en el puerto 3000');
})