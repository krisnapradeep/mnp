const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({

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
    ref: 'Year',
    required: true
  },
  benefiedItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  benefiedItem: {
    type: String,
    required: false
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
const collectionName = 'beneficiary';
module.exports = mongoose.model('Beneficiary', beneficiarySchema, collectionName);