const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  bankAccountName: {
    type: String,
    required: false
  },
  bankAccountNo: {
    type: String,
    required: false
  },
  bankAccountIFSC: {
    type: String,
    required: false
  },
  gstNo: {
    type: String,
    required: false
  },
  panNo: {
    type: String,
    required: false
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
const collectionName = 'supplier';
module.exports = mongoose.model('Supplier', supplierSchema, collectionName);