const express = require('express');
const app = express();
const { Level } = require('level');

// Inicializar la base de datos LevelDB
const db = new Level('dataBase', { valueEncoding: 'json' });

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Ruta para recibir bloques y transacciones
app.post('/storeData', async (req, res) => {
    try {
        const { key, data } = req.body;

        // Almacena los datos en la base de datos LevelDB
        await db.put(key, data);
        console.log('Data stored successfully', data);
        res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
        console.error('Error storing data:', error);
        res.status(500).json({ error: 'Error storing data' });
    }
});

// Route to fetch the genesis block
app.get('/genesisBlock', async (req, res) => {
    try {
        const blocks = await db.get('chain');
        const genesisBlockKey = Object.keys(blocks)[0];
        const genesisBlockValue = blocks[genesisBlockKey];
        console.log('Genesis block fetched successfully', genesisBlockValue);
        res.status(200).json(genesisBlockValue);
    } catch (error) {
        if (error.notFound) {
            res.status(404).json({ error: 'Genesis block not found' });
        } else {
            console.error('Error fetching genesis block:', error);
            res.status(500).json({ error: 'Error fetching genesis block' });
        }
    }
});

app.get('/getBlockChain', async (req, res) => {
    try {
        const blocks = await db.get('chain');
        console.log('BlockChain fetched successfully', blocks);
        res.status(200).json(blocks);
    } catch (error) {
        if (error.notFound) {
            res.status(404).json({ error: 'Genesis block not found' });
        } else {
            console.error('Error fetching genesis block:', error);
            res.status(500).json({ error: 'Error fetching genesis block' });
        }
    }
});


// Iniciar el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
