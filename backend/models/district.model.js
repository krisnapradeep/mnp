const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({  
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    index: true,
    auto:true
  },
  districtName: {
    type: String,
    required: true,
    unique: true
  },
  head: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  communicationAddress: {
    type: String,
    required: true
  },
  notes: String,
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

module.exports = mongoose.model('District', districtSchema);