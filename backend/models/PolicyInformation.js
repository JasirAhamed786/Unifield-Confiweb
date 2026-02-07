const mongoose = require('mongoose');

const policyInformationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['Agricultural Policy', 'Trade Policy', 'Environmental Policy', 'Technology Policy', 'Other'], default: 'Other' },
  region: { type: String, default: 'Global' },
  effectiveDate: { type: Date },
  expiryDate: { type: Date },
  implementingAuthority: { type: String },
  contactInfo: { type: String },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PolicyInformation', policyInformationSchema);
