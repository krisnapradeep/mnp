const mongoose = require('mongoose');

const beneficiaryListSchema = new mongoose.Schema({


    beneficiaryTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BeneficiaryType',
        required: true
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year',
        required: true
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: false
    },
    beneficiaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beneficiary',
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    unitCost: {
        type: Number,
        required: false
    },
    totalCost: {
        type: Number,
        required: false
    },
    isOrderPlaced: {
        type: Boolean,
        default: false
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleOrder',
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
const collectionName = 'beneficiarylist';
module.exports = mongoose.model('BeneficiaryList', beneficiaryListSchema, collectionName);
