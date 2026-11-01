require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Middleware
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
});

// Article routes
app.use('/api/articles', articleRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });