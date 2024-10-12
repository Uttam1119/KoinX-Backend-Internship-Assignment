const Crypto = require('../models/crypto');

// Function to get stats
const getStats = async (req, res) => {
    const { coin } = req.query;
  
    if (!coin || !['bitcoin', 'ethereum', 'matic'].includes(coin)) {
      return res.status(400).json({ error: 'Invalid coin provided. Please use bitcoin, ethereum, or matic.' });
    }
  
    try {
      // Fetch the latest data for the requested coin
      const latestData = await Crypto.findOne({ name: new RegExp(coin, 'i') }).sort({ fetchedAt: -1 });
      if (!latestData) {
        return res.status(404).json({ error: 'No data found for the requested coin.' });
      }
  
      return res.json({
        price: latestData.price,
        marketCap: latestData.market_cap,
        '24hChange': latestData.change_24h
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = { getStats};