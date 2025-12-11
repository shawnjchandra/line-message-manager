// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

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

// 1. Define the BASE directory where all data lives
const DATA_DIR = path.join(__dirname, 'data');

// 2. Ensure the data folder exists on startup
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

const getSafeFilePath = (filename) => {
    const nameWithoutExt = filename.replace(/\.json$/i, '');
    const safeName = path.basename(nameWithoutExt).replace(/[^a-zA-Z0-9\-_]/g, '');
    return path.join(DATA_DIR, `${safeName}.json`);
};

app.get('/api/data/:filename', (req, res) => {
    const filePath = getSafeFilePath(req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.json([]); 
    }
    console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read file" });
        }
        res.json(data ? JSON.parse(data) : []);
    });
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