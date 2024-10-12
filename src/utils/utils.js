exports.calculateStandardDeviation = (prices) => {
  const n = prices.length;
  const mean = prices.reduce((a, b) => a + b, 0) / n;

  // Use sample standard deviation if you want to divide by n - 1
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / (n - 1);
  
  return Math.sqrt(variance);
};