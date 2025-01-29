const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({

  districtName: {
    type: String,
    required: true,
    unique: true
  },
  head: {
    type: String,
    required: false
  },
  contactNo: {
    type: String,
    required: false
  },
  emailId: {
    type: String,
    required: false
  },
  communicationAddress: {
    type: String,
    required: false
  },
  notes: String,
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
const collectionName = 'district';
module.exports = mongoose.model('District', districtSchema, collectionName);