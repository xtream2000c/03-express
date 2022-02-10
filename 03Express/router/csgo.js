const express = require('express');
const router = express.Router();
const Mapas = require('../models/mapas');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayMapasDB = await Mapas.find();
        console.log(arrayMapasDB);
        res.render("mapas", { 
            arrayMapas: arrayMapasDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get("/crear", (req,res) =>{
    res.render("crear")//Nueva vista crear
})

router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const MapasDB = new Mapas(body) //Creamos un nuevo Pokemon, gracias al modelo
        await MapasDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/mapas') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

module.exports = router;