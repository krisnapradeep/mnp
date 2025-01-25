const Supplier = require('../models/supplier.model');

// Create Supplier
exports.createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json({ status: 'success', data: { supplier } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all Suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json({ status: 'success', results: suppliers.length, data: { suppliers } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get Supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ status: 'fail', message: 'Supplier not found' });
        res.status(200).json({ status: 'success', data: { supplier } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update Supplier
exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!supplier) return res.status(404).json({ status: 'fail', message: 'Supplier not found' });
        res.status(200).json({ status: 'success', data: { supplier } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) return res.status(404).json({ status: 'fail', message: 'Supplier not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
