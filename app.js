const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const articulosRoutes = require('./routes/articulos');

app.use(express.json());
app.use(articulosRoutes);

app.get('/', (req,res) => {
    res.send('El servidor esta funcionando correctamente');
});

dbconnect().then(() => {
    app.listen(3000, () => {
        console.log('El servidor está corriendo en el puerto 3000');
    });
}).catch(err => {
    console.error('No se pudo iniciar el servidor debido a un error en la base de datos');
});