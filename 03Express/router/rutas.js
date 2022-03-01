const express = require('express') //Requerimos Express
const router = express.Router();

// Ahora, CORTAMOS del fichero principal 01-express.js
// las dos rutas que tenemos: la principal ( / ) y la 
// de contactos ( /contaco )
// Importante que ya no usaremos el app.get(...), ahora
//vamos a utilizar las rutas, por lo que deberemos poner:

//Por peticion de cliente GET
router.get('/', (req, res) => { //Usamos funcion flecha para evitar funciones innecesarias OBLIGATORIO req y res, '/' es el directorio en que va a buscar (Localhost)
    res.render('index',{titulo:'Inicio'}) 
  })
  
router.get('/contacto', (req, res) => { // usamos /contacto para crear una nueva ruta
    res.render('contacto', {tituloContacto:'Estas en contacto'}) 
})

// Por último, vamos a exportarlo:
module.exports = router;