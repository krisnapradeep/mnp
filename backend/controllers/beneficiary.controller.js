const Beneficiary = require('../models/beneficiary.model');

// Create Beneficiary
exports.createBeneficiary = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.create(req.body);
        res.status(201).json({ status: 'success', data: { beneficiary } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all Beneficiaries
exports.getAllBeneficiaries = async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        res.status(200).json({ status: 'success', results: beneficiaries.length, data: { beneficiaries } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get Beneficiary by ID
exports.getBeneficiaryById = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findById(req.params.id);
        if (!beneficiary) return res.status(404).json({ status: 'fail', message: 'Beneficiary not found' });
        res.status(200).json({ status: 'success', data: { beneficiary } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update Beneficiary
exports.updateBeneficiary = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!beneficiary) return res.status(404).json({ status: 'fail', message: 'Beneficiary not found' });
        res.status(200).json({ status: 'success', data: { beneficiary } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete Beneficiary
exports.deleteBeneficiary = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findByIdAndDelete(req.params.id);
        if (!beneficiary) return res.status(404).json({ status: 'fail', message: 'Beneficiary not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
