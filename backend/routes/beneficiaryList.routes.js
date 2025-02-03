const express = require('express');
const router = express.Router();
const beneficiaryListController = require('../controllers/beneficiaryList.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     BeneficiaryList:
 *       type: object
 *       required:
 *         - beneficiaryTypeId
 *         - yearId
 *         - articleId
 *         - quantity
 *         - unitCost
 *         - totalCost
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         beneficiaryTypeId:
 *           type: string
 *           description: ID of the beneficiary type
 *         yearId:
 *           type: string
 *           description: ID of the year
 *         articleId:
 *           type: string
 *           description: ID of the article
 *         districtId:
 *           type: string
 *           description: ID of the district
 *         beneficiaryId:
 *           type: string
 *           description: ID of the beneficiary
 *         quantity:
 *           type: number
 *           description: Quantity of articles
 *         unitCost:
 *           type: number
 *           description: Cost per unit
 *         totalCost:
 *           type: number
 *           description: Total cost
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the record
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the record
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/beneficiarylist:
 *   get:
 *     summary: Get all beneficiary lists
 *     tags: [Beneficiary Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all beneficiary lists
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
router.get('/', authMiddleware.protect, beneficiaryListController.getAllBeneficiaryLists);

/**
 * @swagger
 * /api/beneficiarylist/{id}:
 *   get:
 *     summary: Get beneficiary list by ID
 *     tags: [Beneficiary Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary List ID
 *     responses:
 *       200:
 *         description: Beneficiary list details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     beneficiaryList:
 *                       $ref: '#/components/schemas/BeneficiaryList'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, beneficiaryListController.getBeneficiaryListById);

/**
 * @swagger
 * /api/beneficiarylist:
 *   post:
 *     summary: Create a new beneficiary list
 *     tags: [Beneficiary Lists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - beneficiaryTypeId
 *               - yearId
 *               - articleId
 *               - quantity
 *               - unitCost
 *             properties:
 *               beneficiaryTypeId:
 *                 type: string
 *               yearId:
 *                 type: string
 *               articleId:
 *                 type: string
 *               districtId:
 *                 type: string
 *               beneficiaryId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               unitCost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Beneficiary list created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     beneficiaryList:
 *                       $ref: '#/components/schemas/BeneficiaryList'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, beneficiaryListController.createBeneficiaryList);

/**
 * @swagger
 * /api/beneficiarylist/{id}:
 *   patch:
 *     summary: Update beneficiary list
 *     tags: [Beneficiary Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary List ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beneficiaryTypeId:
 *                 type: string
 *               yearId:
 *                 type: string
 *               articleId:
 *                 type: string
 *               districtId:
 *                 type: string
 *               beneficiaryId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               unitCost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Beneficiary list updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     beneficiaryList:
 *                       $ref: '#/components/schemas/BeneficiaryList'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryListController.updateBeneficiaryList);

/**
 * @swagger
 * /api/beneficiarylist/{id}:
 *   delete:
 *     summary: Delete beneficiary list
 *     tags: [Beneficiary Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary List ID
 *     responses:
 *       204:
 *         description: Beneficiary list deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryListController.deleteBeneficiaryList);

module.exports = router;
