const Crypto = require('../models/crypto');
const { calculateStandardDeviation } = require('../utils/utils'); // Adjust path as needed

const getDeviation = async (req, res) => {
    const { coin } = req.query;
  
    // Validate the coin parameter
    if (!coin || !['bitcoin', 'ethereum', 'matic'].includes(coin)) {
      return res.status(400).json({ error: 'Invalid coin provided. Please use bitcoin, ethereum, or matic.' });
    }
  
    try {
      // Fetch the last 100 records for the requested coin
      const priceRecords = await Crypto.find({ name: new RegExp(coin, 'i') })
                                       .sort({ fetchedAt: -1 })
                                       .limit(100);
  
      if (priceRecords.length === 0) {
        return res.status(404).json({ error: 'No data available for the requested coin.' });
      }
  
      // Extract the prices from the records
      const prices = priceRecords.map(record => record.price);
  
      // Ensure there are enough prices to calculate the standard deviation
      if (prices.length < 2) {
        return res.status(400).json({ error: 'Not enough data to calculate deviation.' });
      }
  
      // Calculate standard deviation
      const deviation = calculateStandardDeviation(prices);
  
      return res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
      console.error('Error calculating deviation:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getDeviation };