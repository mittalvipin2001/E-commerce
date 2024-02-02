require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./db');
const mongoose = require('mongoose');



const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the connectDB function with error handling
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error, process.env.MONGODB_URI);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

app.use(bodyParser.json());
app.use('/api', productRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!'); // or you can redirect or render a homepage
});


// Gracefully handle closing the server on SIGTERM and SIGINT
const gracefulShutdown = () => {
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close( () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = app;
