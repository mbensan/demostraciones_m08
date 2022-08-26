const { Router } = require('express')
const router = Router()

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
  res.render('login.html')
})

// ruta que procesa el formulario de Login
router.post('/login', (req, res) => {
  // 1. me traigo los datos del formulario
  const email = req.body.email.trim()
  const password = req.body.password.trim()

  // 2. intento buscar al usuario en base a su email y contraseña 
  let user_buscado;
  for (let user of USERS) {
    if (user.email == email) {
      user_buscado = user;
      break
    }
  }

  // 3. Verificamos si el usuario existe o no
  if (!user_buscado) {
    console.log('Usuario no encontrado');
    return res.redirect('/login')
  }

  // 4.  Ahora si sabemos que existe un usuario con ese email, vamos a verificar las contraseñas
  if (user_buscado.password != password) {
    console.log('Contraseñas no existen');
    return res.redirect('/login')
  }

  // 5. Si el usuario efectivamente existe, y las contraseñas coinciden, entonces lo guardamos en sesión
  console.log('TODO BIEN');
  req.session.user = user_buscado;

  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login')
})

router.get('/register', (req, res) => {
  res.send('No implementado')
})

router.post('/register', (req, res) => {
  res.send('No implementado')
})

module.exports = router;