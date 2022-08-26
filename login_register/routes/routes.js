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


router.get('/', (req, res) => {
  res.render('index.html', {user: req.session.user})
})

router.get('/dos', (req, res) => {
  res.render('dos.html', {user: req.session.user})
})

router.get('/tres', (req, res) => {
  res.render('tres.html', {user: req.session.user})
})

router.get('*', (req, res) => {
  res.render('404.html')
})

module.exports = router;