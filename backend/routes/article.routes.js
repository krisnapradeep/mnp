const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const authMiddleware = require('../middleware/auth');

// Article routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleController.createArticle);
router.get('/', authMiddleware.protect, articleController.getAllArticles);
router.get('/:id', authMiddleware.protect, articleController.getArticleById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleController.updateArticle);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), articleController.deleteArticle);

module.exports = router;
