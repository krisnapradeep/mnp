const District = require('../models/district.model');

// Create District
exports.createDistrict = async (req, res) => {
    try {
        const district = await District.create(req.body);
        res.status(201).json({ status: 'success', data: { district } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all Districts
exports.getAllDistricts = async (req, res) => {
    try {
        const data = await District.find()
        .select('_id districtName');
        res.status(200).json({ status: 'success', length: data.length, data });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get District by ID
exports.getDistrictById = async (req, res) => {
    try {
        const district = await District.findById(req.params.id);
        if (!district) return res.status(404).json({ status: 'fail', message: 'District not found' });
        res.status(200).json({ status: 'success', data: { district } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update District
exports.updateDistrict = async (req, res) => {
    try {
        const district = await District.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!district) return res.status(404).json({ status: 'fail', message: 'District not found' });
        res.status(200).json({ status: 'success', data: { district } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete District
exports.deleteDistrict = async (req, res) => {
    try {
        const district = await District.findByIdAndDelete(req.params.id);
        if (!district) return res.status(404).json({ status: 'fail', message: 'District not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
