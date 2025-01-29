const mongoose = require('mongoose');

// Importing models
const User = require('./user.model');
const Article = require('./article.model');
const Beneficiary = require('./beneficiary.model');
const BeneficiaryList = require('./beneficiaryList.model');
const BeneficiaryType = require('./beneficiaryType.model');
const Category = require('./category.model');
const District = require('./district.model');
const Year = require('./year.model');

// Sample query to fetch articles with their categories
const fetchArticlesWithCategories = async () => {
    return await Article.find()
        .select('_id articleName categoryId categoryName')
        .where('isActive').equals(true)
        .populate('categoryId', 'categoryName') // Join with Category
        .exec();
};

// Sample query to fetch beneficiaries with their types and lists
const fetchBeneficiariesWithDetails = async () => {
    return await Beneficiary.find()
        .populate('yearId') // Assuming yearId references a Year model
        .exec();
};

// Sample query to fetch beneficiary lists with types and districts
const fetchBeneficiaryListsWithDetails = async () => {
    const beneficiaries = await BeneficiaryList.find()
        //.select('_id beneficiaryName beneficiaryTypeId yearId articleId districtId beneficiaryId createdBy')
        .populate({ path: 'beneficiaryTypeId', select: 'beneficiaryType' }) // Join with BeneficiaryType
        .populate({ path: 'yearId', select: 'year' }) // Join with year
        .populate({ path: 'articleId', select: 'articleName', populate: { path: 'categoryId', select: 'categoryName' } }) // Join with Article
        .populate({ path: 'districtId', select: 'districtName' }) // Join with District
        .populate({ path: 'beneficiaryId', select: 'name' }) // Join with Beneficiary
        .populate({ path: 'createdBy', select: 'name' })
        .exec();
    return { status: 'success', results: beneficiaries.length, data: { beneficiaries } };
};

module.exports = {
    fetchArticlesWithCategories,
    fetchBeneficiariesWithDetails,
    fetchBeneficiaryListsWithDetails
};
