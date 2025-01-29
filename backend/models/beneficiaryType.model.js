const mongoose = require('mongoose');

const beneficiaryTypeSchema = new mongoose.Schema({

  beneficiaryType: {
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
const collectionName = 'beneficiarytype';
module.exports = mongoose.model('BeneficiaryType', beneficiaryTypeSchema, collectionName);