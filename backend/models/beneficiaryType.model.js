const mongoose = require('mongoose');

const beneficiaryTypeSchema = new mongoose.Schema({
  beneficiaryTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    auto:true
  },
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
    ref: 'User'
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'modifiedOn'
  }
});

module.exports = mongoose.model('BeneficiaryType', beneficiaryTypeSchema);