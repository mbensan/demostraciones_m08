const { Router } = require('express')
const router = Router()

const { get_user, create_user } = require('../db/users.js')

const USERS = [
  {
    name: 'Tony Montana',
    email: "tony@mail.com",
    password: "1234"
  },
  {
    name: 'Matias José',
    email: "mbensan@gmail.com",
    password: "9876"
  }
]


// ruta que carga el formulario del login
router.get('/login', (req, res) => {
  const messages = req.flash()
  res.render('login.html', { messages })
})

// ruta que procesa el formulario de Login
router.post('/login', async (req, res) => {
  // 1. me traigo los datos del formulario
  const email = req.body.email.trim()
  const password = req.body.password.trim()

  // 2. intento buscar al usuario en base a su email 
  let user_buscado = await get_user(email)
  if (!user_buscado) {
    req.flash('errors', 'Usuario es inexistente o contraseña incorrecta')
    return res.redirect('/login')
  }

  // 3. verificamos las contraseñas
  if (user_buscado.password != password) {
    req.flash('errors', 'Usuario es inexistente o contraseña incorrecta')
    return res.redirect('/login')
  }
  
  // PARTE FINAL
  req.session.user = {
    name: user_buscado.name,
    email: user_buscado.email
  }
  return res.redirect('/')  
})

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login')
})

router.get('/register', (req, res) => {
  const messages = req.flash()
  console.log(messages);
  res.render('register.html', {messages})
})

router.post('/register', async (req, res) => {
  // 1. me traigo los datos del formulario
  const name = req.body.name.trim()
  const email = req.body.email.trim()
  const password = req.body.password.trim()
  const password_repeat = req.body.password_repeat.trim()

  // 2. validamos que contraseñas coincidan
  if (password != password_repeat) {
    req.flash('errors', 'Las contraseñas no coinciden')
    return res.redirect('/register')
  }

  // 3. validamos que no exista otro usuario con ese mismo correo
  const current_user = await get_user(email)
  if (current_user) {
    req.flash('errors', 'Ese email ya está ocupado')
    return res.redirect('/register')
  }

  // 4. Finalmente lo agregamos a la base de datos
  await create_user(name, email, password)
  req.session.user = { name, email }

  // 5. y redirigimos a la ruta principal
  res.redirect('/')
})

module.exports = router;
