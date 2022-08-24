const express = require('express')
const { crearTipo } = require('./db/funciones.js')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/new-tipo', (req, res) => {
  res.render('new-tipo.html')
})

router.get('/new-vehiculo', (req, res) => {
  res.render('new-vehiculo.html')
})

router.post('/tipos', async (req, res) => {
  // 1. Obtengo los valores del formulario
  const nombre = req.body.nombre
  
  try {
    await crearTipo(nombre)
  }
  catch (error) {
    console.log(error);
  }
  res.redirect('/new-tipo')
})


module.exports = router
