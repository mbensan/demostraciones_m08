const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");

const app = express();

// se configuran archivos estáticos
app.use("/static", express.static("static"));

// se configura nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});

// Configuramos formularios
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const frutas = ['Sandía', 'Melón', 'Uvas']

// Rutas
app.get("/", (req, res) => {
  res.render("home.html", { saludo: "hola curso!" });
});

// Ejemplo
app.get("/otro",(req,res)=>{
  const datos = {
    saludo: 'hola curso!',
    frutas: frutas,
    usuario: {
      nombre: 'John',
      apellido: 'Wick',
      edad: 27
    }
  }
  res.render('otro_template.html', datos);
 });

 app.post('/frutas', (req, res) => {
  frutas.push(req.body.fruta)
  res.redirect('/otro')
 })

app.listen(3000, () => {
  console.log('servidor ejecutando en el puerto 3000');
})
