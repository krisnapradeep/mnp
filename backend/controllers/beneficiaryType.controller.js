const BeneficiaryType = require('../models/beneficiaryType.model');

// Create BeneficiaryType
exports.createBeneficiaryType = async (req, res) => {
    try {
        const beneficiaryType = await BeneficiaryType.create(req.body);
        res.status(201).json({ status: 'success', data: { beneficiaryType } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all BeneficiaryTypes
exports.getAllBeneficiaryTypes = async (req, res) => {
    try {
        const beneficiaryTypes = await BeneficiaryType.find();
        res.status(200).json({ status: 'success', results: beneficiaryTypes.length, data: { beneficiaryTypes } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get BeneficiaryType by ID
exports.getBeneficiaryTypeById = async (req, res) => {
    try {
        const beneficiaryType = await BeneficiaryType.findById(req.params.id);
        if (!beneficiaryType) return res.status(404).json({ status: 'fail', message: 'BeneficiaryType not found' });
        res.status(200).json({ status: 'success', data: { beneficiaryType } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update BeneficiaryType
exports.updateBeneficiaryType = async (req, res) => {
    try {
        const beneficiaryType = await BeneficiaryType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!beneficiaryType) return res.status(404).json({ status: 'fail', message: 'BeneficiaryType not found' });
        res.status(200).json({ status: 'success', data: { beneficiaryType } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete BeneficiaryType
exports.deleteBeneficiaryType = async (req, res) => {
    try {
        const beneficiaryType = await BeneficiaryType.findByIdAndDelete(req.params.id);
        if (!beneficiaryType) return res.status(404).json({ status: 'fail', message: 'BeneficiaryType not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
