const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapasSchema = new Schema({
    nombre : String,
    tipo : String,
    descripcion : String
});

//Creanis ek modelo

const Mapas = mongoose.model("BDCSGO", mapasSchema, "Mapas");
module.exports = Mapas;

