require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middleware/logger');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const userTypeRoutes = require('./routes/userType.routes');

const app = express();

// CORS middleware - allow all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false // Set to false since we're allowing all origins
}));

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

// Body parsing
app.use(express.json());

// Test endpoints
app.get('/api/test-get', (req, res) => {
    console.log('GET /api/test-get received');
    res.json({ message: 'Test GET successful' });
});

app.post('/api/test-post', (req, res) => {
    console.log('POST /api/test-post received');
    console.log('Body:', req.body);
    res.json({ message: 'Test POST successful', receivedData: req.body });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/usertypes', userTypeRoutes);

// Use logger middleware
app.use(logger);

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Something went wrong!'
    });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5005;

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('CORS enabled for all origins');
});
