const { Router } = require('express')
const { v4: uuidv4 } = require('uuid');

const { create_panorama, get_panoramas } = require('../db/panoramas.js')

const router = Router()

// Vamos a crear un middleware para ver si el usuario está logueado o no
function protected_route (req, res, next) {
  if (!req.session.user) {
    req.flash('errors', 'Debe loguearse primero')
    return res.redirect('/login')
  }
  // si llegamos hasta acá, guardamos el usuario de la sesión en una variable de los templates
  res.locals.user = req.session.user;
  // finalmente, seguimos el camino original
  next()
}


router.get('/', protected_route, (req, res) => {
  console.log(req.session.user);
  res.render('index.html')
})

router.get('/dos', protected_route, (req, res) => {
  res.render('dos.html')
})

router.post('/panorama', protected_route, async (req, res) => {
  const name = req.body.name.trim()
  const image = req.files.image

  console.log(image);
  const extension = image.name.split('.')[1]
  const id_image = uuidv4()

  const image_name = `${id_image}.${extension}`

  // acá movemos la imagen a la carpeta de imagenes subidas por el usuario
  await image.mv(`public/uploaded/${image_name}`)
  console.log(req.session.user)
  await create_panorama(name, image_name)

  res.redirect('/tres')
})

router.get('/tres', protected_route, async (req, res) => {
  const panoramas = await get_panoramas()
  res.render('tres.html', { panoramas })
})

router.get('*', (req, res) => {
  res.render('404.html')
})

module.exports = router;