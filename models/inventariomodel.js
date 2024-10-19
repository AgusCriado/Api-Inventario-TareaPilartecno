const mongoose = require('mongoose');

// Definir el esquema de articulo
const ArticuloSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        },
        cantidad: {
            type: Number,
            required: true,
        },
        categoria: {
            type: String,
            required: true,
            enum: ['Gaseosas','Galletas','Frutas'],
        },
        estado: {
            type: String,
            enum: ['Disponible','Agotado','Pedido realizado'],
            default: 'Disponible',
        },
        fechapedido: {
            type: Date,
        },
        fechaentrega: {
            type: Date,
        },
        
    },
    {
        timestamps: true, // Añadir las fechas de creación y modificación automáticamente
    }
);

// Crear el modelo 
const ModelArticulo = mongoose.model("articulos", ArticuloSchema);
module.exports = ModelArticulo;