// Desafio SQL & Node
// En el endpoiont .post/productos se crea la tabla y se llena con los datos seleccionados
//--------------- Configuracion DB------------------
const knex = require('knex'); 
 const options = 
 {
     client : 'mysql',
     connection : 
     {
         host:'127.0.0.1',
         user:'root',
         password:'',
         database:'ecommerce'
     }
 }
//------------------------------------------------
 
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
const productos = [];// array vacio en donde se cargan los datos ingresados

    
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

  //----- Gestion a la base de Datos---
  const database = knex(options)// conexion a la base de datos}

  const ManageDatabase = async() => {   // Validacion si existe la tabla
      let tableExist = await database.schema.hasTable('productos')

      if(tableExist)
      {
        await database.schema.dropTable('productos')
      }
      await database.schema.createTable('productos',table => { // creacion de tabla
        table.increments('id'),
        table.string('nombre', 20),
        table.integer('precio'),
        table.string('imagen',20)
    }) 

    await database('productos').insert(productos) // insertar array con los productos ingresados a la tabla

 }
    ManageDatabase()    // fin de conexion a DB
      .then(() => console.log('Datos ingresados correctamente')) 
      .catch(err => console.log(err))
      .finally(() => database.destroy())
  
//-------------------------    
  return res.redirect('/')
})




app.get('/productos', (req,res)=> // end point donde retorna la data
{
  console.log(productos)
  return res. render('layouts/productos',productos) // archivo y variables a renderizar
})
//



