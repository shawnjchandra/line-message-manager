// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'https://line-message-manager.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 1. Define the BASE directory where all data lives
const DATA_DIR = path.join(__dirname, 'data');

// 2. Ensure the data folder exists on startup
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// 3. Helper to make sure filenames are safe and end in .json
const getSafeFilePath = (filename) => {
    // 1. Remove .json extension if the user sent it
    const nameWithoutExt = filename.replace(/\.json$/i, '');

    // 2. Clean up special characters (prevent hacking)
    const safeName = path.basename(nameWithoutExt).replace(/[^a-zA-Z0-9\-_]/g, '');
    
    // 3. Add .json back safely
    return path.join(DATA_DIR, `${safeName}.json`);
};

// --- GENERIC GET ENDPOINT ---
// Usage: GET /api/data/users -> reads 'data/users.json'
app.get('/api/data/:filename', (req, res) => {
    const filePath = getSafeFilePath(req.params.filename);

    if (!fs.existsSync(filePath)) {
        // If file doesn't exist yet, return an empty array (or object)
        return res.json([]); 
    }
    console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read file" });
        }
        // Handle empty files gracefully
        res.json(data ? JSON.parse(data) : []);
    });
});

// --- GENERIC SAVE ENDPOINT ---
// Usage: POST /api/save/users -> writes to 'data/users.json'
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