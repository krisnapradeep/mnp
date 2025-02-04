const BeneficiaryList = require('../models/beneficiaryList.model');
const Year = require('../models/year.model');
const BeneficiaryType = require('../models/beneficiaryType.model');
const DistrictFunds = require('../models/districtFunds.model');
const Beneficiary = require('../models/beneficiary.model');
var mongoose = require('mongoose');
// Create BeneficiaryList
exports.createBeneficiaryList = async (req, res) => {
    try {
        const current_year = await Year.findOne({ isCurrent: true, isActive: true });
        const beneficiaryTypeId = await BeneficiaryType.findOne({ beneficiaryType: req.body.type });
        const user_id = req.user._id;
        const yearId = current_year._id;
        const create_data = req.body
        console.log("create_data", create_data);
        if (create_data.mode === 'Edit') {
            // get existing beneficiaryList
            const beneficiaryList = await BeneficiaryList.findById(create_data.id); 
            if (!beneficiaryList) {
                return res.status(400).json({ status: 'fail', message: 'Beneficiary List not found' });
            }
            old_totalCost = beneficiaryList.totalCost
            
            // update beneficiaryList
            const districtId = new mongoose.Types.ObjectId(create_data.districtId);
            const categoryId = new mongoose.Types.ObjectId(create_data.categoryId);
            const articleId = new mongoose.Types.ObjectId(create_data.articleId);
            const beneficiaryTypeId = await BeneficiaryType.findOne({ beneficiaryType: create_data.type });
            if (create_data.type === 'District') {
                const update_beneficiaryList = await BeneficiaryList.findOneAndUpdate({ _id: create_data.id }, { districtId, categoryId, articleId, beneficiaryTypeId, quantity: create_data.quantity, unitCost: create_data.unitCost, totalCost: create_data.totalCost, updatedBy: user_id });
                if (update_beneficiaryList) {
                    const districtFunds = await DistrictFunds.findOne({ districtId, yearId });
                    if (districtFunds) {
                        old_funds_utilised = districtFunds.funds_utilised;
                        new_funds_utilised = old_funds_utilised - old_totalCost + create_data.totalCost;
                        new_funds_balance = districtFunds.funds_balance - new_funds_utilised;
                        await districtFunds.updateOne({ funds_utilised: new_funds_utilised, funds_balance: new_funds_balance });
                    }
                    res.status(200).json({ status: 'success', message: "updated successfully" });
                }
            }
            else {
                const beneficiaryId = new mongoose.Types.ObjectId(create_data.beneficiaryId);
                const beneficiaryName = create_data.beneficiaryName;
                const code = create_data.code;
                const prefix = create_data.prefix;
                const beneficiary = await Beneficiary.findOne({ _id: beneficiaryId });
                if (beneficiary) {
                    await beneficiary.updateOne({ name: beneficiaryName, code, updatedBy: user_id });
                }
                const update_beneficiaryList = await BeneficiaryList.findOneAndUpdate({ _id: create_data.id }, { categoryId, articleId, beneficiaryTypeId, beneficiaryId, beneficiaryName, quantity: create_data.quantity, unitCost: create_data.unitCost, totalCost: create_data.totalCost, updatedBy: user_id });
                if (update_beneficiaryList) {
                    res.status(200).json({ status: 'success', message: "updated successfully" });
                }
            }
        }
        else {
            if (create_data.type === 'District') {
                const districtId = new mongoose.Types.ObjectId(create_data.districtId);
                const categoryId = new mongoose.Types.ObjectId(create_data.categoryId);
                const articleId = new mongoose.Types.ObjectId(create_data.articleId);
                // create beneficiaryList
                console.log("districtId", districtId);
                console.log("categoryId", categoryId);
                console.log("articleId", articleId);
                const beneficiaryList = await BeneficiaryList.create({ districtId, categoryId, articleId, beneficiaryTypeId, yearId, quantity: create_data.quantity, unitCost: create_data.unitCost, totalCost: create_data.totalCost, createdBy: user_id });
                // update districtFunds
                const districtFunds = await DistrictFunds.findOne({ districtId, yearId });
                const funds_utilised = districtFunds.funds_utilised + create_data.totalCost;
                const funds_balance = districtFunds.funds_balance - create_data.totalCost;
                const update_districtFunds = await DistrictFunds.findOneAndUpdate({ districtId, yearId }, { funds_utilised, funds_balance }, { new: true });
                if (beneficiaryList && update_districtFunds) {
                    res.status(200).json({ status: 'success', message: "created successfully" });
                }
            }
            else {

                // add beneficiary
                const beneficiary = await Beneficiary.create({
                    name: create_data.beneficiaryName,
                    prefix: GetBeneficiaryCode(create_data.type), code: create_data.code, uniqueId: create_data.uniqueId,
                    yearId: yearId, createdBy: user_id
                });
                const beneficiaryId = beneficiary._id;
                const categoryId = new mongoose.Types.ObjectId(create_data.categoryId);
                const articleId = new mongoose.Types.ObjectId(create_data.articleId);
                // create beneficiaryList
                const beneficiaryList = await BeneficiaryList.create({ beneficiaryId, categoryId, articleId, beneficiaryTypeId, yearId, quantity: create_data.quantity, unitCost: create_data.unitCost, totalCost: create_data.totalCost, createdBy: user_id });
                if (beneficiaryList && beneficiary) {
                    res.status(200).json({ status: 'success', message: "created successfully" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
        console.log(error);
    }
};

// Get all BeneficiaryLists
exports.getAllBeneficiaryLists = async (req, res) => {
    try {
        const current_year = await Year.findOne({ isCurrent: true, isActive: true });
        //const beneficiaryLists = await BeneficiaryList.find({ yearId: current_year._id });
        const beneficiaryLists = await BeneficiaryList.find()
            //.select('_id beneficiaryName beneficiaryTypeId yearId articleId districtId beneficiaryId createdBy')
            .populate({ path: 'beneficiaryTypeId', select: 'beneficiaryType' }) // Join with BeneficiaryType
            .populate({ path: 'yearId', select: 'year' }) // Join with year
            .populate({ path: 'articleId', select: 'articleName', populate: { path: 'categoryId', select: 'categoryName' } }) // Join with Article
            .populate({ path: 'districtId', select: 'districtName' }) // Join with District
            .populate({ path: 'beneficiaryId', select: 'name code prefix uniqueId' }) // Join with Beneficiary
            .populate({ path: 'createdBy', select: 'name' })
            .where('yearId').equals(current_year._id);
        //console.log("BeneficiaryList beneficiaryLists", beneficiaryLists)
        const data = beneficiaryLists.map(df => ({
            id: df._id,
            beneficiaryType: df.beneficiaryTypeId.beneficiaryType,
            beneficiaryTypeId: df.beneficiaryTypeId._id, // type
            yearId: df.yearId._id,
            year: df.yearId.year,
            articleId: df.articleId._id,
            article: df.articleId.articleName,
            categoryId: df.articleId.categoryId._id,
            category: df.articleId.categoryId.categoryName,
            beneficiary: df.beneficiaryId ? DisplayBeneficiary(df.beneficiaryId.name, df.beneficiaryTypeId.beneficiaryType, df.beneficiaryId.code) : df.districtId.districtName,
            beneficiaryId: df.beneficiaryId ? df.beneficiaryId._id : null,
            beneficiaryName: df.beneficiaryId ? df.beneficiaryId.name : null,
            code: df.beneficiaryId ? df.beneficiaryId.code : null,
            prefix: df.beneficiaryId ? df.beneficiaryId.prefix : null,
            uniqueId: df.beneficiaryId ? df.beneficiaryId.uniqueId : null,
            districtId: df.districtId ? df.districtId._id : null,
            district: df.districtId ? df.districtId.districtName : null,
            quantity: df.quantity,
            unitCost: df.unitCost,
            totalCost: df.totalCost,
            createdBy: df.createdBy._id
        }));
        //console.log("BeneficiaryList data", data)
        res.status(200).json({ status: 'success', length: data.length, data });
    } catch (error) {
        console.log("BeneficiaryList error", error)
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get BeneficiaryList by ID
exports.getBeneficiaryListById = async (req, res) => {
    try {
        // const beneficiaryList = await BeneficiaryList.findById(req.params.id);
        const current_year = await Year.findOne({ isCurrent: true, isActive: true });
        //const beneficiaryLists = await BeneficiaryList.find({ yearId: current_year._id });
        const beneficiaryLists = await BeneficiaryList.find({ _id: req.params.id })
            //.select('_id beneficiaryName beneficiaryTypeId yearId articleId districtId beneficiaryId createdBy')
            .populate({ path: 'beneficiaryTypeId', select: 'beneficiaryType' }) // Join with BeneficiaryType
            .populate({ path: 'yearId', select: 'year' }) // Join with year
            .populate({ path: 'articleId', select: 'articleName', populate: { path: 'categoryId', select: 'categoryName' } }) // Join with Article
            .populate({ path: 'districtId', select: 'districtName' }) // Join with District
            .populate({ path: 'beneficiaryId', select: 'name uniqueId' }) // Join with Beneficiary
            .populate({ path: 'createdBy', select: 'name' })
            .where('yearId').equals(current_year._id);
        if (!beneficiaryLists) return res.status(404).json({ status: 'fail', message: 'BeneficiaryList not found' });
        //console.log("BeneficiaryList beneficiaryLists", beneficiaryLists)
        const data = beneficiaryLists.map(df => ({
            id: df._id,
            beneficiaryType: df.beneficiaryTypeId.beneficiaryType,
            beneficiaryTypeId: df.beneficiaryTypeId._id, // type
            yearId: df.yearId._id,
            year: df.yearId.year,
            articleId: df.articleId._id,
            article: df.articleId.articleName,
            categoryId: df.articleId.categoryId._id,
            category: df.articleId.categoryId.categoryName,
            beneficiary: df.beneficiaryId ? df.beneficiaryId.name : df.districtId.districtName,
            uniqueId: df.beneficiaryId ? df.beneficiaryId.uniqueId : null,
            districtId: df.districtId ? df.districtId._id : null,
            district: df.districtId ? df.districtId.districtName : null,
            createdBy: df.createdBy._id
        }));
        //console.log("BeneficiaryList data", data)
        res.status(200).json({ status: 'success', results: data.length, data });


    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Check if BeneficiaryList exists
exports.checkBeneficiaryListExists = async (req, res, next) => {
    try {
        const current_year = await Year.findOne({ isCurrent: true, isActive: true });
        const beneficiaryTypeId = await BeneficiaryType.findOne({ beneficiaryType: req.body.type });
        const user_id = req.user._id;
        const yearId = current_year._id;
        const create_data = req.body
        if (create_data.type === 'District') {
            const districtId = new mongoose.Types.ObjectId(create_data.districtId);
            const articleId = new mongoose.Types.ObjectId(create_data.articleId);
            const beneficiaryList = await BeneficiaryList.find({ districtId, yearId, articleId, beneficiaryTypeId }); 
            if (beneficiaryList.length > 0 ){
                const data = beneficiaryList.map(df => ({
                    quantity: df.quantity
                }))
                return res.status(200).json({ status: 'success', length: beneficiaryList.length, data});
            }
        }
        else{

            const beneficiaryId = new mongoose.Types.ObjectId(create_data.beneficiaryId);
            const articleId = new mongoose.Types.ObjectId(create_data.articleId);
            const beneficiaryList = await BeneficiaryList.find({ beneficiaryTypeId, yearId, beneficiaryId, articleId }); 
            if (beneficiaryList.length > 0 ){
                const data = beneficiaryList.map(df => ({
                    quantity: df.quantity
                }))
                return res.status(200).json({ status: 'success', length: beneficiaryList.length, data});
            }

            }
        res.status(200).json({ status: 'success', length: 0, data: null });
       
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

function GetBeneficiaryCode(beneficiaryType) {
    if (!beneficiaryType) return null;
    if (beneficiaryType === "Public") return "P";
    if (beneficiaryType === "Institute") return "I";
    if (beneficiaryType === "Panchayat") return "Py";

}

function DisplayBeneficiary(beneficiary, beneficiaryType, code) {
    return GetBeneficiaryCode(beneficiaryType) + code + " - " + beneficiary;
}