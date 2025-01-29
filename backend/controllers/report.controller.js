const BeneficiaryList = require('../models/beneficiaryList.model');
const Category = require('../models/category.model');
const Article = require('../models/article.model');
const District = require('../models/district.model');
const Year = require('../models/year.model');
const BeneficiaryType = require('../models/beneficiaryType.model');

// Retrieve all beneficiaryList by category and year
exports.getBeneficiaryListByCategoryAndYear = async (req, res) => {
    const { categoryId, yearId } = req.query;
    try {
        const beneficiaries = await BeneficiaryList.find({ categoryId, yearId })
            .populate('categoryId')
            .populate('yearId');
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all beneficiaryList by article and year
exports.getBeneficiaryListByArticleAndYear = async (req, res) => {
    const { articleId, yearId } = req.query;
    try {
        const beneficiaries = await BeneficiaryList.find({ articleId, yearId })
            .populate('articleId')
            .populate('yearId');
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all beneficiaryList by district and year
exports.getBeneficiaryListByDistrictAndYear = async (req, res) => {
    const { districtId, yearId } = req.query;
    try {
        const beneficiaries = await BeneficiaryList.find({ districtId, yearId })
            .populate('districtId')
            .populate('yearId');
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all beneficiaryList by year
exports.getBeneficiaryListByYear = async (req, res) => {
    const { yearId } = req.query;
    try {
        const beneficiaries = await BeneficiaryList.find({ yearId })
            .populate('yearId');
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch count of beneficiaryList grouped by category
exports.getBeneficiaryCountByCategoryAndYear = async (req, res) => {
    const { categoryId, yearId } = req.query;
    try {
        const count = await BeneficiaryList.countDocuments({ categoryId, yearId });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch count of beneficiaryList grouped by beneficiaryType
exports.getBeneficiaryCountByTypeAndYear = async (req, res) => {
    const { beneficiaryTypeId, yearId } = req.query;
    try {
        const count = await BeneficiaryList.countDocuments({ beneficiaryTypeId, yearId });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
