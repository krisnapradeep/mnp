const ArticleOrder = require('../models/articleOrder.model');

// Create ArticleOrder
exports.createArticleOrder = async (req, res) => {
    try {
        const articleOrder = await ArticleOrder.create(req.body);
        res.status(201).json({ status: 'success', data: { articleOrder } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all ArticleOrders
exports.getAllArticleOrders = async (req, res) => {
    try {
        const articleOrders = await ArticleOrder.find();
        res.status(200).json({ status: 'success', results: articleOrders.length, data: { articleOrders } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get ArticleOrder by ID
exports.getArticleOrderById = async (req, res) => {
    try {
        const articleOrder = await ArticleOrder.findById(req.params.id);
        if (!articleOrder) return res.status(404).json({ status: 'fail', message: 'ArticleOrder not found' });
        res.status(200).json({ status: 'success', data: { articleOrder } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update ArticleOrder
exports.updateArticleOrder = async (req, res) => {
    try {
        const articleOrder = await ArticleOrder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!articleOrder) return res.status(404).json({ status: 'fail', message: 'ArticleOrder not found' });
        res.status(200).json({ status: 'success', data: { articleOrder } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete ArticleOrder
exports.deleteArticleOrder = async (req, res) => {
    try {
        const articleOrder = await ArticleOrder.findByIdAndDelete(req.params.id);
        if (!articleOrder) return res.status(404).json({ status: 'fail', message: 'ArticleOrder not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
