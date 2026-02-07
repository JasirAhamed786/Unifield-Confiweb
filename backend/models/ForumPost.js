const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  upvotes: { type: Number, default: 0 },
  expertReplies: { type: Boolean, default: false }
});

module.exports = mongoose.model('ForumPost', forumPostSchema);
