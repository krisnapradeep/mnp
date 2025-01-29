const Year = require('../models/year.model');

// Create Year
exports.createYear = async (req, res) => {
    try {
        const Year = await Year.create(req.body);
        res.status(201).json({ status: 'success', data: { Year } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all Years
exports.getAllYears = async (req, res) => {
    try {
        const Years = await Year.find();
        res.status(200).json({ status: 'success', results: Years.length, data: { Years } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get Year by ID
exports.getYearById = async (req, res) => {
    try {
        const Year = await Year.findById(req.params.id);
        if (!Year) return res.status(404).json({ status: 'fail', message: 'Year not found' });
        res.status(200).json({ status: 'success', data: { Year } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update Year
exports.updateYear = async (req, res) => {
    try {
        const Year = await Year.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!Year) return res.status(404).json({ status: 'fail', message: 'Year not found' });
        res.status(200).json({ status: 'success', data: { Year } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete Year
exports.deleteYear = async (req, res) => {
    try {
        const Year = await Year.findByIdAndDelete(req.params.id);
        if (!Year) return res.status(404).json({ status: 'fail', message: 'Year not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
