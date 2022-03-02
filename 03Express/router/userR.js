const express = require('express');
const router = express.Router();
const storage = require('node-sessionstorage');
const User = require('../models/user');

router.get('/registro', (req, res) => { // usamos /contacto para crear una nueva ruta
    res.render('registro') 
  })

router.get('/login', (req, res) => { // usamos /contacto para crear una nueva ruta
res.render('login') 
})

//Aqui se crea el usuario

router.post("/", (req, res)=>{
    const {username, password} = req.body;

    const user = new User({username, password});

    user.save(err=>{
        if(err){
            res.status(500);
            res.render('register', { //Mostraremos el error en la vista "register"
                error: true,
                mensaje: 'No se ha podido registrar el usuario'
            });
        }else{
            res.status(200);
            res.render('register', { //Mostraremos el error en la vista "register"
                error: false,
                mensaje: 'Usuario registrado con exito'
            });
        }
    })
})

//Aqui se inicia sesion

router.post("/inicioSesion", (req, res)=>{
    const {username, password} = req.body;

    User.findOne({username}, (err, user)=>{
        if(err){
            res.status(500);
            res.render('inicioSesion', { //Mostraremos el error en la vista "inicioSesion"
                error: true,
                mensaje: 'No se ha podido verificar el usuario'
            });
        }else if(!user){
            res.status(500);
            res.render('inicioSesion', { //Mostraremos el error en la vista "inicioSesion"
                error: true,
                mensaje: 'No existe ese usuario'
            });
        }else{

            

            res.status(200);
            res.render('inicioSesion', { //Mostraremos el error en la vista "inicioSesion"
                error: false,
                mensaje: 'Sesion iniciada con exito',
                usuario : user.username, 
                contraseña : user.password
            });
        }
    });

});

module.exports = router;