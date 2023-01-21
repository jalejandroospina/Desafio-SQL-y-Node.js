const express = require('express'); 
const { engine } = require('express-handlebars'); 
const app = express(); // creo la app de express

app.use(express.json()); //middlewares
app.use(express.urlencoded({extended : true}));


app.engine('hbs',engine({  // config engine
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
}))


//set aplication
app.set('views','./views'); // vistas
app.set('view engine', 'hbs');// motor a utilizar

app. use('public' , express.static('public')); // carpeta publica

const PORT = 8080; // variable para el puerto

const server = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))

server.on('error', err => console.log(`Error en servidor: ${err}`))

//Handlebars
const productos = [];

    
app.get('/', (req,res)=> 
{
  const params = {
    productos
  }
    
    return res. render('layouts/main', params) // archivo y variables a renderizar
})

app.post('/productos',(req,res)=>
{
  const producto =
  {
    nombre : req.body.nombre,
    precio : req.body.precio,
    imagen : req.body.imagen
  }
  productos.push(producto);

  return res.redirect('/')
})

app.get('/productos', (req,res)=> // end point donde retorna la data
{
  console.log(productos)
  return res. render('layouts/productos',productos) // archivo y variables a renderizar
})
//



