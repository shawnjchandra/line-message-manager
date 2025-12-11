const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');

const app = express();

const redis = new Redis(process.env.storage_REDIS_URL);

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.get('/api/data/:filename', async (req, res) => {
    try {
        const data = await redis.get(req.params.filename);
        res.json(data ? JSON.parse(data) : []);
    } catch (err) {
        console.error('Error reading from Redis:', err);
        res.status(500).json({ error: "Failed to read data", details: err.message });
    }
});

app.post('/api/save/:filename', async (req, res) => {
    try {
        await redis.set(req.params.filename, JSON.stringify(req.body));
        console.log(`Saved ${req.params.filename}`);
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving to Redis:', err);
        res.status(500).json({ success: false, details: err.message });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'API is running', status: 'ok' });
});

module.exports = app;