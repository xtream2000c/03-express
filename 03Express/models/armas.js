const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapasSchema = new Schema({
    nombre : String,
    tipo : String,
    descripcion : String
});

//Creamos el modelo

const Armas = mongoose.model("Armas", mapasSchema, "Armas");

module.exports = Armas;

