const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

  categoryName: {
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
const collectionName = 'category';
module.exports = mongoose.model('Category', categorySchema, collectionName);