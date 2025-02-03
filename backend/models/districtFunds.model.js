const mongoose = require('mongoose');

const districtFundsSchema = new mongoose.Schema({
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
        required: true
    },
    funds_total: {
        type: Number,
        required: true
    },
    funds_utilised: {
        type: Number,
        default: 0
    },
    funds_balance: {
        type: Number,
        default: 0
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
}, { timestamps: true });

module.exports = mongoose.model('DistrictFunds', districtFundsSchema);
