const express = require('express');
const router = express.Router();
const ModelArticulo = require('../models/inventariomodel'); 

// Obtener todos los articulos (GET)
router.get('/articulos', async (req, res) => {
    try {
        const articulos = await ModelArticulo.find(); // Obtener todos los articulos
        res.status(200).send(articulos);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los articulos del inventario', error });
    }
});

// Obtener un articulo por ID (GET)
router.get('/articulos/:id', async (req, res) => {
    try {
        const articulos = await ModelArticulo.findById(req.params.id); // Buscar articulo por ID
        if (!articulos) {
            return res.status(404).send({ mensaje: 'No se encontro el item' });
        }
        res.status(200).send(articulos);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el articulo', error });
    }
});

// Crear un nuevo articulo (POST)
router.post('/articulos', async (req, res) => {
    const body = req.body;
    try {
        const nuevoArticulo = await ModelArticulo.create(body); // Insertar en la base de datos
        res.status(201).send(nuevoArticulo); // 201 indica que se ha creado un recurso
    } catch (error) {
        res.status(400).send(error); // Manejar errores
    }
});

// Actualizar un articulo por ID (PUT)
router.put('/articulos/:id', async (req, res) => {
    try {
        const articuloActualizado = await ModelArticulo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!articuloActualizado) {
            return res.status(404).send({ mensaje: 'Articulo no encontrado' });
        }
        res.status(200).send(articuloActualizado);
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar el articulo', error });
    }
});

// Eliminar un articulo por ID (DELETE)
router.delete('/articulos/:id', async (req, res) => {
    try {
        const articuloEliminado = await ModelArticulo.findByIdAndDelete(req.params.id); // Eliminar articulo por ID
        if (!articuloEliminado) {
            return res.status(404).send({ mensaje: 'Articulo no encontrado' });
        }
        res.status(200).send({ mensaje: 'Articulo eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el articulo', error });
    }
});

// Endpoint de búsqueda con filtros Obtener categoria y falta de stock

router.get('/articulos/negocio/busqueda', async (req, res) => {
    const { categoria } = req.query;  

    try {
        const query = {};
        if (categoria) query.categoria = categoria;  

        const articulos = await ModelArticulo.find(query);  // Buscar libros según los filtros aplicados
        if (!articulos.length) {
            return res.status(404).send({ mensaje: 'No se encontraron articulos con los parametros dados' });
        }

        res.status(200).send(articulos);  // Enviar los articulos encontrados
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar articulo', error });
    }
});

router.get('/articulos/agotado', async (req, res) => {
    const { estado } = req.query;  

    try {
        const query = {};
        if (estado) query.estado = estado;  

        const articulos = await ModelArticulo.find(query);  
        if (!articulos.length) {
            return res.status(404).send({ mensaje: 'No se encontraron articulos con los parametros dados' });
        }

        res.status(200).send(articulos);  // Enviar los articulos encontrados
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar articulos', error });
    }
});




module.exports = router;