const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  market_cap: Number,
  change_24h: Number,
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crypto', cryptoSchema);
