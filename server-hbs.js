// Desafio SQL & Node

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

 //----- Gestion a la base de Datos---
 const database = knex(options)// conexion a la base de datos

  // Validacion y creacion dee la tabla
  const manageDb= async() => {

    let tableExist =  await database.schema.hasTable('productos')

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

  }
     
  manageDb()   // fin de conexion a DB
     .then(() => console.log('Tabla creada correctamente')) 
     .catch(err => console.log(err))
     .finally(() => database.destroy())
 
//-------------------------    
    
app.get('/', (req,res)=> 
{
  let params = {
    productos
  }
  const database = knex(options)// conexion a la base de datos 

  database.from('productos').select('*')
  .then(data =>console.log(JSON.parse(JSON.stringify(data))))
  .catch(err => console.log(err))
  .finally(() => database.destroy)

  
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

  const database = knex(options)// conexion a la base de datos 

  database('productos').insert(producto)
  .then((result) => console.log(result))
  .catch(err => console.log(err))
  .finally(() => database.destroy())

  return res.redirect('/')
})



  







