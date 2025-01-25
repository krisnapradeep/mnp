const SupplierPayment = require('../models/supplierPayment.model');

// Create SupplierPayment
exports.createSupplierPayment = async (req, res) => {
    try {
        const supplierPayment = await SupplierPayment.create(req.body);
        res.status(201).json({ status: 'success', data: { supplierPayment } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all SupplierPayments
exports.getAllSupplierPayments = async (req, res) => {
    try {
        const supplierPayments = await SupplierPayment.find();
        res.status(200).json({ status: 'success', results: supplierPayments.length, data: { supplierPayments } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get SupplierPayment by ID
exports.getSupplierPaymentById = async (req, res) => {
    try {
        const supplierPayment = await SupplierPayment.findById(req.params.id);
        if (!supplierPayment) return res.status(404).json({ status: 'fail', message: 'SupplierPayment not found' });
        res.status(200).json({ status: 'success', data: { supplierPayment } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update SupplierPayment
exports.updateSupplierPayment = async (req, res) => {
    try {
        const supplierPayment = await SupplierPayment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!supplierPayment) return res.status(404).json({ status: 'fail', message: 'SupplierPayment not found' });
        res.status(200).json({ status: 'success', data: { supplierPayment } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete SupplierPayment
exports.deleteSupplierPayment = async (req, res) => {
    try {
        const supplierPayment = await SupplierPayment.findByIdAndDelete(req.params.id);
        if (!supplierPayment) return res.status(404).json({ status: 'fail', message: 'SupplierPayment not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
