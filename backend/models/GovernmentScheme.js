const mongoose = require('mongoose');

const governmentSchemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Subsidy', 'Loan', 'Insurance', 'Training', 'Other'], default: 'Other' },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  applicationProcess: { type: String, required: true },
  deadline: { type: Date },
  contactInfo: { type: String },
  region: { type: String, default: 'Global' },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GovernmentScheme', governmentSchemeSchema);
