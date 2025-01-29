const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  articleName: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'modifiedOn'
  }
});
const collectionName = 'article';
module.exports = mongoose.model('Article', articleSchema, collectionName);