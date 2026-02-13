3require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // No need for options in Mongoose 6+
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // process.exit(1); // Optional: Exit on DB failure
    }
};

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
