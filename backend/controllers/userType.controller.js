const UserType = require('../models/userType.model');

// Create UserType
exports.createUserType = async (req, res) => {
    try {
        const userType = await UserType.create(req.body);
        res.status(201).json({ status: 'success', data: { userType } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all UserTypes
exports.getAllUserTypes = async (req, res) => {
    try {
        const userTypes = await UserType.find();
        res.status(200).json({ status: 'success', results: userTypes.length, data: { userTypes } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get UserType by ID
exports.getUserTypeById = async (req, res) => {
    try {
        const userType = await UserType.findById(req.params.id);
        if (!userType) return res.status(404).json({ status: 'fail', message: 'UserType not found' });
        res.status(200).json({ status: 'success', data: { userType } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update UserType
exports.updateUserType = async (req, res) => {
    try {
        const userType = await UserType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!userType) return res.status(404).json({ status: 'fail', message: 'UserType not found' });
        res.status(200).json({ status: 'success', data: { userType } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete UserType
exports.deleteUserType = async (req, res) => {
    try {
        const userType = await UserType.findByIdAndDelete(req.params.id);
        if (!userType) return res.status(404).json({ status: 'fail', message: 'UserType not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
