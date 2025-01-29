const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  isCurrent: {
    type: Boolean,
    default: false
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

const collectionName = 'year';
module.exports = mongoose.model('Year', yearSchema, collectionName);