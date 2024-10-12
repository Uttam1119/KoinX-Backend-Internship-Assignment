const cron = require('node-cron');
const fetchCryptoData = require('../services/fetchCryptoData.js')

// Schedule job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Fetching crypto data...');
    fetchCryptoData();
  });