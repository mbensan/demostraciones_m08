const express = require('express')
const { Tipo, Vehiculo } = require('./db/models.js')

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


module.exports = router
