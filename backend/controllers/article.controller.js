const Article = require('../models/article.model');
const mongoose = require('mongoose');

// Create Article
exports.createArticle = async (req, res) => {
    try {
        const { categoryId, articleName } = req.body;
        const categoryObjId = new mongoose.Types.ObjectId(categoryId);

        const data = await Article.create({ categoryId: categoryObjId, articleName, createdBy: req.user.id });
        res.status(201).json({ status: 'success', data });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all Articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()
        .populate({path : 'categoryId', select: 'categoryName'})
        .select('_id articleName categoryId categoryName')
        .where('isActive').equals(true);

        const data = articles.map(df => ({
            id: df._id,
            articleName: df.articleName,
            categoryName: df.categoryId.categoryName,
            categoryId: df.categoryId._id,
        }));

        res.status(200).json({ status: 'success', results: data.length, data });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all Articles in a category
exports.getAllArticlesByCategory = async (req, res) => {
    try {
        const articles = await Article.find({ categoryId: req.params.id })
        .populate({path : 'categoryId', select: 'categoryName'})
        .select('_id articleName categoryId categoryName unitCost')
        .where('isActive').equals(true);

        const data = articles.map(df => ({
            id: df._id,
            articleName: df.articleName,
            categoryName: df.categoryId.categoryName,
            categoryId: df.categoryId._id,
            unitCost: df.unitCost
        }));

        res.status(200).json({ status: 'success', length: data.length, data });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get Article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.find({ _id: req.params.id })
        .populate({path : 'categoryId', select: 'categoryName'})
        .select('_id articleName categoryId categoryName');
        if (!article) return res.status(404).json({ status: 'fail', message: 'Article not found' });
        const data = article.map(df => ({
            id: df._id,
            articleName: df.articleName,
            categoryName: df.categoryId.categoryName,
            categoryId: df.categoryId._id,
        }));

        res.status(200).json({ status: 'success', results: data.length, data });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update Article
exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!article) return res.status(404).json({ status: 'fail', message: 'Article not found' });
        res.status(200).json({ status: 'success', data: { article } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete Article
exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ status: 'fail', message: 'Article not found' });
        res.status(200).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
