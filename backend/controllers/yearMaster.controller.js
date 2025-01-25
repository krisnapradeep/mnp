const YearMaster = require('../models/yearMaster.model');

// Create YearMaster
exports.createYearMaster = async (req, res) => {
    try {
        const yearMaster = await YearMaster.create(req.body);
        res.status(201).json({ status: 'success', data: { yearMaster } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all YearMasters
exports.getAllYearMasters = async (req, res) => {
    try {
        const yearMasters = await YearMaster.find();
        res.status(200).json({ status: 'success', results: yearMasters.length, data: { yearMasters } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get YearMaster by ID
exports.getYearMasterById = async (req, res) => {
    try {
        const yearMaster = await YearMaster.findById(req.params.id);
        if (!yearMaster) return res.status(404).json({ status: 'fail', message: 'YearMaster not found' });
        res.status(200).json({ status: 'success', data: { yearMaster } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update YearMaster
exports.updateYearMaster = async (req, res) => {
    try {
        const yearMaster = await YearMaster.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!yearMaster) return res.status(404).json({ status: 'fail', message: 'YearMaster not found' });
        res.status(200).json({ status: 'success', data: { yearMaster } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete YearMaster
exports.deleteYearMaster = async (req, res) => {
    try {
        const yearMaster = await YearMaster.findByIdAndDelete(req.params.id);
        if (!yearMaster) return res.status(404).json({ status: 'fail', message: 'YearMaster not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
