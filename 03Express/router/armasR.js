const express = require('express');
const router = express.Router();
const Armas = require('../models/armas');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayArmasDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayarma que tenemos EN LA VISTA
        const arrayArmasDB = await Armas.find();
        console.log(arrayArmasDB);
        res.render("armas", { 
            arrayArmas: arrayArmasDB
        });
    } catch (error) {
        console.error(error)
    }
})

router.get("/crearArma", (req,res) =>{
    res.render("crearArma")//Nueva vista crear
})

router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const ArmasDB = new Armas(body) //Creamos un nuevo arma, gracias al modelo
        await ArmasDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/armas'); //Volvemos al listado

    } catch (error) {
        console.log('error', error)
    }
})


router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "Armas.ejs" le pusimos
    //a este campo arma.id, por eso lo llamados con params.id
    try {
        const ArmasDB = await Armas.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable "Armas" está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(ArmasDB) //Para probarlo por consola
        res.render('detalleArma', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            arma: ArmasDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleArma', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'arma no encontrado!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const ArmasDB = await Armas.findByIdAndDelete({ _id: id });
        console.log(ArmasDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/arma') //Esto daría un error, tal y como podemos ver arriba
        if (!ArmasDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el arma.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'arma eliminado.'
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
        const ArmasDB = await Armas.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(ArmasDB)
        res.json({
            estado: true,
            mensaje: 'arma editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el arma'
        })
    }
})

module.exports = router;