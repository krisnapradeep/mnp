const BeneficiaryList = require('../models/beneficiaryList.model');

// Create BeneficiaryList
exports.createBeneficiaryList = async (req, res) => {
    try {
        const beneficiaryList = await BeneficiaryList.create(req.body);
        res.status(201).json({ status: 'success', data: { beneficiaryList } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all BeneficiaryLists
exports.getAllBeneficiaryLists = async (req, res) => {
    try {
        const beneficiaryLists = await BeneficiaryList.find();
        res.status(200).json({ status: 'success', results: beneficiaryLists.length, data: { beneficiaryLists } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get BeneficiaryList by ID
exports.getBeneficiaryListById = async (req, res) => {
    try {
        const beneficiaryList = await BeneficiaryList.findById(req.params.id);
        if (!beneficiaryList) return res.status(404).json({ status: 'fail', message: 'BeneficiaryList not found' });
        res.status(200).json({ status: 'success', data: { beneficiaryList } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update BeneficiaryList
exports.updateBeneficiaryList = async (req, res) => {
    try {
        const beneficiaryList = await BeneficiaryList.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!beneficiaryList) return res.status(404).json({ status: 'fail', message: 'BeneficiaryList not found' });
        res.status(200).json({ status: 'success', data: { beneficiaryList } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete BeneficiaryList
exports.deleteBeneficiaryList = async (req, res) => {
    try {
        const beneficiaryList = await BeneficiaryList.findByIdAndDelete(req.params.id);
        if (!beneficiaryList) return res.status(404).json({ status: 'fail', message: 'BeneficiaryList not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
