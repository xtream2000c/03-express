
const express = require('express') //Requiere express
const app = express() //Variable para disponer de todas las variables de Express

require("dotenv").config();

const port = process.env.PORT || 3000 //Puerto de escucha


//Conexión a base de datos
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ojxco.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e));

//Motor de plantillas
app.set('view engine', 'ejs');

//***********************Ruta para ficheros dinamicos*************************
app.set('views', __dirname+'/views');

//llamadas a las rutas:
app.use("/", require("./router/rutas"));
app.use("/mapas", require("./router/csgo"));

//***********************Ruta para ficheros estaticos*************************
app.use(express.static(__dirname+'/public'));

app.use('/', (req, res) => {
  res.status(404).render("404", {
    titulo:"Error 404", 
    descripcion:"Pagina no encontrada"
  }) 
})

//Importante mostrar el puerto para cuando este en produccion saber cual es el puerto de escucha
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})