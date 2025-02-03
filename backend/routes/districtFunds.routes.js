const express = require('express');
const router = express.Router();
const districtFundsController = require('../controllers/districtFunds.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     DistrictFunds:
 *       type: object
 *       required:
 *         - districtId
 *         - yearId
 *         - funds_total
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         districtId:
 *           type: string
 *           description: ID of the district
 *         yearId:
 *           type: string
 *           description: ID of the year
 *         funds_total:
 *           type: number
 *           description: Total funds allocated
 *         funds_utilised:
 *           type: number
 *           description: Funds utilized so far
 *         funds_balance:
 *           type: number
 *           description: Remaining funds balance
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the fund allocation
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the fund allocation
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /api/districtfund:
 *   post:
 *     summary: Create a new district fund allocation
 *     tags: [District Funds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - districtId
 *               - funds_total
 *               - funds_utilised
 *               - funds_balance
 *             properties:
 *               districtId:
 *                 type: string
 *                 description: ID of the district
 *               funds_total:
 *                 type: number
 *                 description: Total funds to allocate
 *               funds_utilised:
 *                 type: number
 *                 description: Funds utilized so far
 *               funds_balance:
 *                 type: number
 *                 description: Remaining funds balance 
 *     responses:
 *       200:
 *         description: District fund created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 length:
 *                   type: number
 *                 data:
 *                   type: array
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtFundsController.createDistrictFunds);

/**
 * @swagger
 * /api/districtfund:
 *   get:
 *     summary: Get all district fund allocations
 *     tags: [District Funds]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all district fund allocations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 length:
 *                   type: number
 *                 data:
 *                   type: array

 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authMiddleware.protect, districtFundsController.getAllDistrictFunds);

/**
 * @swagger
 * /api/districtfund/{id}:
 *   get:
 *     summary: Get district fund allocation by ID
 *     tags: [District Funds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: District Funds ID
 *     responses:
 *       200:
 *         description: District fund allocation details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 length:
 *                   type: number
 *                 data:
 *                   type: array

 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, districtFundsController.getDistrictFundsById);


// /**
//  * @swagger
//  * /api/districtfund/{id}:
//  *   delete:
//  *     summary: Delete district fund allocation
//  *     tags: [District Funds]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: District Funds ID
//  *     responses:
//  *       204:
//  *         description: District fund allocation deleted successfully
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  *       404:
//  *         $ref: '#/components/responses/NotFoundError'
//  */
// router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtFundsController.deleteDistrictFunds);

// /**
//  * @swagger
//  * /api/districtfund/funds-total:
//  *   post:
//  *     summary: Add or update funds total for a district and year
//  *     tags: [District Funds]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - districtId
//  *               - yearId
//  *               - funds_total
//  *             properties:
//  *               districtId:
//  *                 type: string
//  *                 description: ID of the district
//  *               yearId:
//  *                 type: string
//  *                 description: ID of the year
//  *               funds_total:
//  *                 type: number
//  *                 description: Total funds to allocate
//  *     responses:
//  *       200:
//  *         description: Funds total updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/DistrictFunds'
//  *       400:
//  *         $ref: '#/components/responses/ValidationError'
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  */
// router.post('/funds-total', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtFundsController.addOrUpdateFundsTotal);

// /**
//  * @swagger
//  * /api/districtfund/funds-utilised:
//  *   patch:
//  *     summary: Update funds utilised for a district and year
//  *     tags: [District Funds]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - districtId
//  *               - yearId
//  *               - funds
//  *             properties:
//  *               districtId:
//  *                 type: string
//  *                 description: ID of the district
//  *               yearId:
//  *                 type: string
//  *                 description: ID of the year
//  *               funds:
//  *                 type: number
//  *                 description: Amount of funds utilized
//  *     responses:
//  *       200:
//  *         description: Funds utilised updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/DistrictFunds'
//  *       400:
//  *         $ref: '#/components/responses/ValidationError'
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  *       404:
//  *         $ref: '#/components/responses/NotFoundError'
//  */
// router.patch('/funds-utilised', authMiddleware.protect, authMiddleware.restrictTo('admin'), districtFundsController.updateFundsUtilised);

// /**
//  * @swagger
//  * /api/districtfund/district-wise:
//  *   get:
//  *     summary: Get district-wise fund allocation list
//  *     tags: [District Funds]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: yearId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Year ID to filter by
//  *     responses:
//  *       200:
//  *         description: District-wise fund allocation list retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: success
//  *                 results:
//  *                   type: number
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     districtFunds:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           districtId:
//  *                             type: object
//  *                             properties:
//  *                               _id:
//  *                                 type: string
//  *                               name:
//  *                                 type: string
//  *                           funds_total:
//  *                             type: number
//  *                           funds_utilised:
//  *                             type: number
//  *                           funds_balance:
//  *                             type: number
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  */
// router.get('/district-wise', authMiddleware.protect, districtFundsController.getDistrictWiseList);

// /**
//  * @swagger
//  * /api/districtfund/district-wise-percentage:
//  *   get:
//  *     summary: Get district-wise fund utilization percentages
//  *     tags: [District Funds]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: yearId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Year ID to filter by
//  *     responses:
//  *       200:
//  *         description: District-wise fund utilization percentages retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: success
//  *                 results:
//  *                   type: number
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     districtFundsPercentages:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           districtId:
//  *                             type: object
//  *                             properties:
//  *                               _id:
//  *                                 type: string
//  *                               name:
//  *                                 type: string
//  *                           percent_utilised:
//  *                             type: string
//  *                             description: Percentage of funds utilized
//  *                           percent_balance:
//  *                             type: string
//  *                             description: Percentage of funds remaining
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  */
// router.get('/district-wise-percentage', authMiddleware.protect, districtFundsController.getDistrictWisePercentage);

module.exports = router;
