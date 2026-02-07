const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  region: { type: String, required: true },
  price: { type: Number, required: true },
  trend: { type: String, enum: ['Up', 'Down', 'Stable', 'Juice'], default: 'Stable' }
});

module.exports = mongoose.model('MarketData', marketDataSchema);
