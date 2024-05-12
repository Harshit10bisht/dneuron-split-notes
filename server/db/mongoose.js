const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { 
    useNewUrlParser: true, 
    dbName: 'dneuron_app' 
});

const conn = mongoose.connection;

conn.on('connected', () => {
    console.log("MongoDB is connected successfully");
}).on('error', () => {
    console.log("Error connecting to MongoDB");
});

module.exports = conn;