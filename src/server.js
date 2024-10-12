// server.js
const express = require('express');
const { connectDB } = require('./config/db.js');
const cryptoRoutes = require('./routes/cryptoRoutes.js')
require('dotenv').config();

const app = express();
app.use(express.json());  // Middleware to parse JSON requests

//connect to MongoDB
connectDB();

//import cron job to fetch the data of coins in bg every 2 hours
require('./cron/cronJob.js')

//use routes
app.use('/api/v1', cryptoRoutes)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
