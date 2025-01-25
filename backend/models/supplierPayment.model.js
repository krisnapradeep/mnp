const mongoose = require('mongoose');

const supplierPaymentSchema = new mongoose.Schema({
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        index: true,
        auto:true
    },
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

module.exports = mongoose.model('SupplierPayment', supplierPaymentSchema);
