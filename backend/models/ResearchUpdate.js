const mongoose = require('mongoose');

const researchUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, enum: ['Crop Science', 'Technology', 'Sustainability', 'Policy', 'Other'], default: 'Other' },
  tags: [{ type: String }],
  imageUrl: { type: String },
  publishedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  readTime: { type: Number, default: 5 }, // in minutes
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('ResearchUpdate', researchUpdateSchema);
