const mongoose = require('mongoose');

const supplierPaymentSchema = new mongoose.Schema({

    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    itineraries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleOrder'
    }],
    amount: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    notes: String,
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
const collectionName = 'supplierpayment';
module.exports = mongoose.model('SupplierPayment', supplierPaymentSchema, collectionName);
