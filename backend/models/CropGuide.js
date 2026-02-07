const mongoose = require('mongoose');

const cropGuideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  season: { type: String, required: true },
  soil: { type: String, required: true },
  water: { type: String, required: true },
  diseases: [{ name: String, symptoms: String, treatment: String }],
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('CropGuide', cropGuideSchema);
