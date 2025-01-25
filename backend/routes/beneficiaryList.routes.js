const express = require('express');
const router = express.Router();
const beneficiaryListController = require('../controllers/beneficiaryList.controller');
const authMiddleware = require('../middleware/auth');

// BeneficiaryList routes
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryListController.createBeneficiaryList);
router.get('/', authMiddleware.protect, beneficiaryListController.getAllBeneficiaryLists);
router.get('/:id', authMiddleware.protect, beneficiaryListController.getBeneficiaryListById);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryListController.updateBeneficiaryList);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryListController.deleteBeneficiaryList);

module.exports = router;
