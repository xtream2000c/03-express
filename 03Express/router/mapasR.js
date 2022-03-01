const express = require('express');
const router = express.Router();
const Mapas = require('../models/mapas');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayMapasDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arraymapa que tenemos EN LA VISTA
        const arrayMapasDB = await Mapas.find();
        console.log(arrayMapasDB);
        res.render("mapas", { 
            arrayMapas: arrayMapasDB
        });
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
        const MapasDB = new Mapas(body) //Creamos un nuevo mapa, gracias al modelo
        await MapasDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/mapas'); //Volvemos al listado

    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "mapas.ejs" le pusimos
    //a este campo mapa.id, por eso lo llamados con params.id
    try {
        const MapasDB = await Mapas.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable "Mapas" está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(MapasDB) //Para probarlo por consola
        res.render('detalle', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            mapa: MapasDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Mapa no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const MapasDB = await Mapas.findByIdAndDelete({ _id: id });
        console.log(MapasDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/mapa') //Esto daría un error, tal y como podemos ver arriba
        if (!MapasDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Mapa.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Mapa eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const MapasDB = await Mapas.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(MapasDB)
        res.json({
            estado: true,
            mensaje: 'Mapa editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Mapa'
        })
    }
})

module.exports = router;