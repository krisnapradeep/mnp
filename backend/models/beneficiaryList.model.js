const mongoose = require('mongoose');

const beneficiaryListSchema = new mongoose.Schema({
    beneficiaryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        index: true,
        auto:true
    },
    beneficiaryTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BeneficiaryType',
        required: true
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'YearMaster',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unitCost: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    isOrderPlaced: {
        type: Boolean,
        default: false
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleOrder'
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

module.exports = mongoose.model('BeneficiaryList', beneficiaryListSchema);
