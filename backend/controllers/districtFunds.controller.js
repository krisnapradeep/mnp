const DistrictFunds = require('../models/districtFunds.model');
const District = require('../models/district.model');
const Year = require('../models/year.model');
var mongoose = require('mongoose');

// Create district funds
exports.createDistrictFunds = async (req, res) => {
    try {
        const { districtId, funds_total, funds_utilised, funds_balance } = req.body;

        // Check if district and year exist
        //const district = await District.findById(districtId);
        const current_year = await Year.findOne({ isCurrent: true, isActive: true }, { _id: 1 });
        const yearId = current_year._id;
        const districtObjId = new mongoose.Types.ObjectId(districtId);
        //console.log("DistrictFunds yearId", current_year, yearId)
        //console.log("DistrictFunds body", districtId, funds_total, funds_utilised, funds_balance)
        //console.log("DistrictFunds ObjectId", new mongoose.Types.ObjectId(districtId))
        // if (!district || !yearId) {
        //     return res.status(404).json({
        //         status: 'fail',
        //         message: 'District or Year not found'
        //     });
        // }

        var query = {districtId: districtObjId, yearId:yearId },
            update = { funds_total: funds_total, funds_utilised: funds_utilised, funds_balance: funds_balance, createdBy: req.user._id, modifiedOn: new Date() },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };
        
        console.log("DistrictFunds query", query, update, options)
        // Create district funds with initial balance
        const data = await DistrictFunds.findOneAndUpdate(query, update, options).catch(function (error) {
            return res.status(500).json({
                status: 'fail',
                message: 'Something went wrong'
            });
        })

        res.status(200).json({
            status: 'success',
            length: data.length,
            data
        });
    } catch (error) {
        console.log("DistrictFunds error", error)
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get all district funds
exports.getAllDistrictFunds = async (req, res) => {
    try {
        const yearId = await Year.findOne({ isCurrent: true, isActive: true }, { _id: 1 });
        const districtFunds = await DistrictFunds.find()
            .populate('districtId', 'districtName')
            .populate('yearId', 'year')
            .where('yearId').equals(yearId)
            .select('districtId funds_total funds_utilised funds_balance');
        //console.log("DistrictFunds districtFunds", districtFunds)
        // Calculate percentages
        const data = districtFunds.map(df => ({
            id: df._id,
            districtId: df.districtId._id,
            name: df.districtId.districtName,
            year: df.yearId.year,
            funds_total: df.funds_total.toFixed(2),
            funds_utilised: df.funds_utilised.toFixed(2),
            funds_balance: df.funds_balance.toFixed(2),
            percent_utilised: ((df.funds_utilised / df.funds_total) * 100).toFixed(2),
            percent_balance: ((df.funds_balance / df.funds_total) * 100).toFixed(2)
        }));


        res.status(200).json({
            status: 'success',
            length: data.length,
            data
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get district funds by ID
exports.getDistrictFundsById = async (req, res) => {
    try {
        const yearId = await Year.findOne({ isCurrent: true, isActive: true }, { _id: 1 });
        const districtFunds = await DistrictFunds.find({ districtId: req.params.id })
            .populate('districtId', 'name')
            .populate('yearId', 'year')
            .where('yearId').equals(yearId);

        if (!districtFunds) {
            return res.status(404).json({
                status: 'fail',
                message: 'District funds not found'
            });
        }
        // Calculate percentages
        const data = districtFunds.map(df => ({
            id: df._id,
            districtId: df.districtId._id,
            name: df.districtId.districtName,
            year: df.yearId.year,
            funds_total: df.funds_total.toFixed(2),
            funds_utilised: df.funds_utilised.toFixed(2),
            funds_balance: df.funds_balance.toFixed(2),
            percent_utilised: ((df.funds_utilised / df.funds_total) * 100).toFixed(2),
            percent_balance: ((df.funds_balance / df.funds_total) * 100).toFixed(2)
        }));

        res.status(200).json({
            status: 'success',
            length: data.length,
            data
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};


// // Delete district funds
// exports.deleteDistrictFunds = async (req, res) => {
//     try {
//         const districtFunds = await DistrictFunds.findByIdAndDelete(req.params.id);

//         if (!districtFunds) {
//             return res.status(404).json({
//                 status: 'fail',
//                 message: 'District funds not found'
//             });
//         }

//         res.status(204).json({
//             status: 'success',
//             data: null
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: error.message
//         });
//     }
// };

// // Add or update funds_total
// exports.addOrUpdateFundsTotal = async (req, res) => {
//     const { districtId, yearId, funds_total } = req.body;
//     try {
//         const districtFunds = await DistrictFunds.findOne({ districtId, yearId });

//         if (districtFunds) {
//             // Update existing record
//             districtFunds.funds_total = funds_total;
//             districtFunds.funds_balance = funds_total - districtFunds.funds_utilised;
//             districtFunds.updatedBy = req.user._id;
//             await districtFunds.save();
//         } else {
//             // Create new record
//             await DistrictFunds.create({
//                 districtId,
//                 yearId,
//                 funds_total,
//                 funds_balance: funds_total,
//                 createdBy: req.user._id
//             });
//         }

//         const updatedDistrictFunds = await DistrictFunds.findOne({ districtId, yearId })
//             .populate('districtId', 'name')
//             .populate('yearId', 'year');

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 districtFunds: updatedDistrictFunds
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // Update funds_utilised
// exports.updateFundsUtilised = async (req, res) => {
//     const { districtId, yearId, funds } = req.body;
//     try {
//         const districtFunds = await DistrictFunds.findOne({ districtId, yearId });

//         if (!districtFunds) {
//             return res.status(404).json({
//                 status: 'fail',
//                 message: 'District Funds not found'
//             });
//         }

//         districtFunds.funds_utilised += funds;
//         districtFunds.funds_balance = districtFunds.funds_total - districtFunds.funds_utilised;
//         districtFunds.updatedBy = req.user._id;
//         await districtFunds.save();

//         const updatedDistrictFunds = await DistrictFunds.findOne({ districtId, yearId })
//             .populate('districtId', 'name')
//             .populate('yearId', 'year');

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 districtFunds: updatedDistrictFunds
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // Get district-wise list
// exports.getDistrictWiseList = async (req, res) => {
//     const { yearId } = req.query;
//     try {
//         const districtFunds = await DistrictFunds.find({ yearId })
//             .populate('districtId', 'name')
//             .select('districtId funds_total funds_utilised funds_balance');

//         res.status(200).json({
//             status: 'success',
//             results: districtFunds.length,
//             data: {
//                 districtFunds
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // Get district-wise percentage list
// exports.getDistrictWisePercentage = async (req, res) => {
//     const { yearId } = req.query;
//     try {
//         const districtFunds = await DistrictFunds.find({ yearId })
//             .populate('districtId', 'name')
//             .select('districtId funds_total funds_utilised funds_balance');

//         // Calculate percentages
//         const result = districtFunds.map(df => ({
//             districtId: df.districtId,
//             name: df.districtId.name,
//             percent_utilised: ((df.funds_utilised / df.funds_total) * 100).toFixed(2),
//             percent_balance: ((df.funds_balance / df.funds_total) * 100).toFixed(2)
//         }));

//         res.status(200).json({
//             status: 'success',
//             results: result.length,
//             data: {
//                 districtFundsPercentages: result
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };
