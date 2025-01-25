const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  beneficiaryId: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    auto:true
  },
  name: {
    type: String,
    required: true
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true
  },
  yearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'YearMaster',
    required: true
  },
  benefiedItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  benefiedItem: {
    type: String,
    required: true
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

module.exports = mongoose.model('Beneficiary', beneficiarySchema);