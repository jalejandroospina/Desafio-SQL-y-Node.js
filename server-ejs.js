const express = require('express'); 

const app = express(); // creo la app de express

app.use(express.json()); //middlewares
app.use(express.urlencoded({extended : true}));


//set aplication
app.set('views','./views'); // vistas
app.set('view engine', 'ejs');// motor a utilizar

app. use('public' , express.static('public')); // carpeta publica

const PORT = 8080; // variable para el puerto

const server = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))

server.on('error', err => console.log(`Error en servidor: ${err}`))


const productos = [];

    
app.get('/', (req,res)=> 
{
  const params = {
    productos
  }
    
    return res. render('index', params) // archivo y variables a renderizar
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

