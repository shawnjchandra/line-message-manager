// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const { kv } = require('@vercel/kv');

const app = express();
const PORT = 3001;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.options('*', (req, res) => {
    res.status(200).end();
});

const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

const getSafeFilePath = (filename) => {
    const nameWithoutExt = filename.replace(/\.json$/i, '');
    const safeName = path.basename(nameWithoutExt).replace(/[^a-zA-Z0-9\-_]/g, '');
    return path.join(DATA_DIR, `${safeName}.json`);
};

app.get('/api/data/:filename', async (req, res) => {
    try {
        const data = await kv.get(req.params.filename);
        res.json(data || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read data" });
    }
});


app.post('/api/save/:filename', (req, res) => {
    const filePath = getSafeFilePath(req.params.filename);
    const content = req.body; // The JSON data sent from React

    fs.writeFile(filePath, JSON.stringify(content, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }
        console.log(`Saved ${req.params.filename}.json`);
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;