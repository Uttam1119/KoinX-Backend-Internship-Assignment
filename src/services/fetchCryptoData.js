const axios = require('axios');
const Crypto = require('../models/crypto.js');
require('dotenv').config();

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${process.env.COINGECKO_API}`, {
      params: {
        ids: 'bitcoin,ethereum,matic-network',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true'
      }
    });

    const cryptos = response.data;

    const cryptoData = [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: cryptos.bitcoin.usd,
        market_cap: cryptos.bitcoin.usd_market_cap,
        change_24h: cryptos.bitcoin.usd_24h_change
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        price: cryptos.ethereum.usd,
        market_cap: cryptos.ethereum.usd_market_cap,
        change_24h: cryptos.ethereum.usd_24h_change
      },
      {
        name: 'Matic',
        symbol: 'MATIC',
        price: cryptos['matic-network'].usd,
        market_cap: cryptos['matic-network'].usd_market_cap,
        change_24h: cryptos['matic-network'].usd_24h_change
      }
    ];

    // Save data to MongoDB
    await Crypto.insertMany(cryptoData);
    console.log('Data fetched and stored successfully!');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

module.exports = fetchCryptoData;
