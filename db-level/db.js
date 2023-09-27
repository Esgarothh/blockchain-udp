const express = require('express');
const app = express();
const { Level } = require('level');



// Directorio donde se almacenará la base de datos LevelDB
const dbPath = './level-db-data';

// Inicializar la base de datos LevelDB
const db = new Level('example', { valueEncoding: 'json' });

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Ruta para recibir bloques y transacciones
app.post('/storeData', async (req, res) => {
    try {
        const { key, data } = req.body;

        // Almacena los datos en la base de datos LevelDB
        await db.put(key, data);

        res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
        console.error('Error storing data:', error);
        res.status(500).json({ error: 'Error storing data' });
    }
});

// Iniciar el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
