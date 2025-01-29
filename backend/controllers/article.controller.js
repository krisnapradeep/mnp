const Article = require('../models/article.model');

// Create Article
exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({ status: 'success', data: { article } });
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
        res.status(200).json({ status: 'success', results: articles.length, data: { articles } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get Article by ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ status: 'fail', message: 'Article not found' });
        res.status(200).json({ status: 'success', data: { article } });
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
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
