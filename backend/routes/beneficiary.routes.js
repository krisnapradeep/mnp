const express = require('express');
const router = express.Router();
const beneficiaryController = require('../controllers/beneficiary.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Beneficiary:
 *       type: object
 *       required:
 *         - beneficiaryName
 *         - districtId
 *         - beneficiaryTypeId
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         beneficiaryName:
 *           type: string
 *           description: Name of the beneficiary
 *         districtId:
 *           type: string
 *           description: ID of the district
 *         beneficiaryTypeId:
 *           type: string
 *           description: ID of the beneficiary type
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the beneficiary
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the beneficiary
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/beneficiary:
 *   post:
 *     summary: Create a new beneficiary
 *     tags: [Beneficiaries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - beneficiaryName
 *               - districtId
 *               - beneficiaryTypeId
 *             properties:
 *               beneficiaryName:
 *                 type: string
 *                 description: Name of the beneficiary
 *               districtId:
 *                 type: string
 *                 description: ID of the district
 *               beneficiaryTypeId:
 *                 type: string
 *                 description: ID of the beneficiary type
 *     responses:
 *       201:
 *         description: Beneficiary created successfully
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
 *                     beneficiary:
 *                       $ref: '#/components/schemas/Beneficiary'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryController.createBeneficiary);

/**
 * @swagger
 * /api/beneficiary:
 *   get:
 *     summary: Get all beneficiaries
 *     tags: [Beneficiaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *         description: Filter by district ID
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by beneficiary type ID
 *     responses:
 *       200:
 *         description: List of all beneficiaries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: number
 *                 data:
 *                   type: object
 *                   properties:
 *                     beneficiaries:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Beneficiary'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authMiddleware.protect, beneficiaryController.getAllBeneficiaries);

/**
 * @swagger
 * /api/beneficiary/{id}:
 *   get:
 *     summary: Get beneficiary by ID
 *     tags: [Beneficiaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary ID
 *     responses:
 *       200:
 *         description: Beneficiary details
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
 *                     beneficiary:
 *                       $ref: '#/components/schemas/Beneficiary'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, beneficiaryController.getBeneficiaryById);

/**
 * @swagger
 * /api/beneficiary/{id}:
 *   patch:
 *     summary: Update beneficiary
 *     tags: [Beneficiaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beneficiaryName:
 *                 type: string
 *                 description: New name for the beneficiary
 *               districtId:
 *                 type: string
 *                 description: New district ID
 *               beneficiaryTypeId:
 *                 type: string
 *                 description: New beneficiary type ID
 *     responses:
 *       200:
 *         description: Beneficiary updated successfully
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
 *                     beneficiary:
 *                       $ref: '#/components/schemas/Beneficiary'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryController.updateBeneficiary);

/**
 * @swagger
 * /api/beneficiary/{id}:
 *   delete:
 *     summary: Delete beneficiary
 *     tags: [Beneficiaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary ID
 *     responses:
 *       204:
 *         description: Beneficiary deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryController.deleteBeneficiary);

module.exports = router;
