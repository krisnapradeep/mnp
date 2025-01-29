const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middleware/auth');

// Retrieve all beneficiaryList by category and year
router.get('/beneficiaries/category', authMiddleware.protect, reportController.getBeneficiaryListByCategoryAndYear);

// Retrieve all beneficiaryList by article and year
router.get('/beneficiaries/article', authMiddleware.protect, reportController.getBeneficiaryListByArticleAndYear);

// Retrieve all beneficiaryList by district and year
router.get('/beneficiaries/district', authMiddleware.protect, reportController.getBeneficiaryListByDistrictAndYear);

// Retrieve all beneficiaryList by year
router.get('/beneficiaries/year', authMiddleware.protect, reportController.getBeneficiaryListByYear);

// Fetch count of beneficiaryList grouped by category
router.get('/beneficiaries/count/category', authMiddleware.protect, reportController.getBeneficiaryCountByCategoryAndYear);

// Fetch count of beneficiaryList grouped by beneficiaryType
router.get('/beneficiaries/count/type', authMiddleware.protect, reportController.getBeneficiaryCountByTypeAndYear);

module.exports = router;
