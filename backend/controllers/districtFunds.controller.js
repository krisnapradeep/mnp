const DistrictFunds = require('../models/districtFunds.model');
const District = require('../models/district.model');
const Year = require('../models/year.model');

// Add or update funds_total
exports.addOrUpdateFundsTotal = async (req, res) => {
    const { districtId, yearId, funds_total } = req.body;
    try {
        let districtFunds = await DistrictFunds.findOneAndUpdate(
            { districtId, yearId },
            { funds_total },
            { new: true, upsert: true }
        );
        res.status(200).json(districtFunds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update funds_utilised
exports.updateFundsUtilised = async (req, res) => {
    const { districtId, yearId, funds } = req.body;
    try {
        const districtFunds = await DistrictFunds.findOne({ districtId, yearId });
        if (!districtFunds) return res.status(404).json({ message: 'District Funds not found' });
        districtFunds.funds_utilised += funds;
        districtFunds.funds_balance = districtFunds.funds_total - (districtFunds.funds_utilised);
        await districtFunds.save();
        res.status(200).json(districtFunds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get district-wise list
exports.getDistrictWiseList = async (req, res) => {
    const { yearId } = req.query;
    try {
        const districtFunds = await DistrictFunds.find({ yearId })
            .populate('districtId', 'name') // Assuming district model has a name field
            .select('districtId funds_total funds_utilised funds_balance');
        res.status(200).json(districtFunds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get district-wise percentage list
exports.getDistrictWisePercentage = async (req, res) => {
    const { yearId } = req.query;
    try {
        const districtFunds = await DistrictFunds.find({ yearId })
            .populate('districtId', 'name') // Assuming district model has a name field
            .select('districtId funds_utilised funds_balance');
        // Calculate percentages
        const result = districtFunds.map(df => ({
            districtId: df.districtId,
            name: df.districtId.name,
            percent_utilised: (df.funds_utilised / df.funds_total) * 100,
            percent_balance: (df.funds_balance / df.funds_total) * 100
        }));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
