const express = require('express')

const router = express.Router()

// acá vamos a definir nuestras rutas
router.get('/gastos', (req, res) => {
  res.json({gastos: []})
})

router.get('/roommates', (req, res) => {
  res.json({roommates: []})
})

module.exports = router

