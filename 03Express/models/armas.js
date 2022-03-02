const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const armasSchema = new Schema({
    nombre : String,
    tipo : String,
    descripcion : String
});

//Creamos el modelo

const Armas = mongoose.model("Armas", armasSchema, "Armas");

module.exports = Armas;

