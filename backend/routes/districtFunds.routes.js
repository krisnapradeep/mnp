const express = require('express');
const router = express.Router();
const districtFundsController = require('../controllers/districtFunds.controller');
const authMiddleware = require('../middleware/auth');

// Add or update funds_total
router.post('/', authMiddleware.protect, districtFundsController.addOrUpdateFundsTotal);

// Update funds_utilised
router.patch('/utilised', authMiddleware.protect, districtFundsController.updateFundsUtilised);

// Get district-wise list
router.get('/list', authMiddleware.protect, districtFundsController.getDistrictWiseList);

// Get district-wise percentage list
router.get('/percentages', authMiddleware.protect, districtFundsController.getDistrictWisePercentage);

module.exports = router;
