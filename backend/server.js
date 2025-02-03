require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middleware/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const userTypeRoutes = require('./routes/userType.routes');
const districtFundsRoutes = require('./routes/districtFunds.routes');
const reportRoutes = require('./routes/report.routes');
const yearRoutes = require('./routes/year.routes');
const districtRoutes = require('./routes/district.routes');
const supplierRoutes = require('./routes/supplier.routes');
const categoryRoutes = require('./routes/category.routes');
const articleOrderRoutes = require('./routes/articleOrder.routes');
const articleRoutes = require('./routes/article.routes');
const supplierPaymentRoutes = require('./routes/supplierPayment.routes');
const beneficiaryRoutes = require('./routes/beneficiary.routes');
const beneficiaryTypeRoutes = require('./routes/beneficiaryType.routes');
const beneficiaryListRoutes = require('./routes/beneficiaryList.routes');



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
app.use('/api/usertype', userTypeRoutes);
app.use('/api/districtFund', districtFundsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/year', yearRoutes);
app.use('/api/district', districtRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/articleOrder', articleOrderRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/supplierPayment', supplierPaymentRoutes);
app.use('/api/beneficiary', beneficiaryRoutes);
app.use('/api/beneficiaryType', beneficiaryTypeRoutes);
app.use('/api/beneficiaryList', beneficiaryListRoutes);

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

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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
