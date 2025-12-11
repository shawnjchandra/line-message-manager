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

app.get('/api/data/:filename', async (req, res) => {
    try {
        const data = await kv.get(req.params.filename);
        res.json(data || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read data" });
    }
});


app.post('/api/save/:filename', async (req, res) => {
    try {
        await kv.set(req.params.filename, req.body);
        console.log(`Saved ${req.params.filename}`);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'API is running', status: 'ok' });
});


module.exports = app;