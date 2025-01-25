const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth');

// Category routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), categoryController.createCategory);
router.get('/', authMiddleware.protect, categoryController.getAllCategories);
router.get('/:id', authMiddleware.protect, categoryController.getCategoryById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), categoryController.updateCategory);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), categoryController.deleteCategory);

module.exports = router;
