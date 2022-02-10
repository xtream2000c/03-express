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

module.exports = router;