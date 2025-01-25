const express = require('express');
const router = express.Router();
const articleOrderController = require('../controllers/articleOrder.controller');
const authMiddleware = require('../middleware/auth');

// ArticleOrder routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleOrderController.createArticleOrder);
router.get('/', authMiddleware.protect, articleOrderController.getAllArticleOrders);
router.get('/:id', authMiddleware.protect, articleOrderController.getArticleOrderById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleOrderController.updateArticleOrder);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleOrderController.deleteArticleOrder);

module.exports = router;
