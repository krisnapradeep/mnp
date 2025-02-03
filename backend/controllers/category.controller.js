const Category = require('../models/category.model');

// Create Category
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ status: 'success', data: { category } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get all Categories
exports.getAllCategories = async (req, res) => {
    try {
        const data = await Category.find()
        .where('isActive').equals(true)
        .select('_id categoryName');
        res.status(200).json({ status: 'success', length: data.length, data });
    } catch (error) {
        console.log("Categories ", error)
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ status: 'fail', message: 'Category not found' });
        res.status(200).json({ status: 'success', data: { category } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ status: 'fail', message: 'Category not found' });
        res.status(200).json({ status: 'success', data: { category } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ status: 'fail', message: 'Category not found' });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
