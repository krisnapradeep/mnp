const express = require('express');
const router = express.Router();
const beneficiaryTypeController = require('../controllers/beneficiaryType.controller');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     BeneficiaryType:
 *       type: object
 *       required:
 *         - typeName
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         typeName:
 *           type: string
 *           description: Name of the beneficiary type
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the beneficiary type
 *         updatedBy:
 *           type: string
 *           description: ID of the user who last updated the beneficiary type
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/beneficiarytype:
 *   post:
 *     summary: Create a new beneficiary type
 *     tags: [Beneficiary Types]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - typeName
 *             properties:
 *               typeName:
 *                 type: string
 *                 description: Name of the beneficiary type
 *     responses:
 *       201:
 *         description: Beneficiary type created successfully
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
 *                     beneficiaryType:
 *                       $ref: '#/components/schemas/BeneficiaryType'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryTypeController.createBeneficiaryType);

/**
 * @swagger
 * /api/beneficiarytype:
 *   get:
 *     summary: Get all beneficiary types
 *     tags: [Beneficiary Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all beneficiary types
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
 *                     beneficiaryTypes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BeneficiaryType'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authMiddleware.protect, beneficiaryTypeController.getAllBeneficiaryTypes);

/**
 * @swagger
 * /api/beneficiarytype/{id}:
 *   get:
 *     summary: Get beneficiary type by ID
 *     tags: [Beneficiary Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary Type ID
 *     responses:
 *       200:
 *         description: Beneficiary type details
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
 *                     beneficiaryType:
 *                       $ref: '#/components/schemas/BeneficiaryType'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', authMiddleware.protect, beneficiaryTypeController.getBeneficiaryTypeById);

/**
 * @swagger
 * /api/beneficiarytype/{id}:
 *   patch:
 *     summary: Update beneficiary type
 *     tags: [Beneficiary Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary Type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeName:
 *                 type: string
 *                 description: New name for the beneficiary type
 *     responses:
 *       200:
 *         description: Beneficiary type updated successfully
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
 *                     beneficiaryType:
 *                       $ref: '#/components/schemas/BeneficiaryType'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryTypeController.updateBeneficiaryType);

/**
 * @swagger
 * /api/beneficiarytype/{id}:
 *   delete:
 *     summary: Delete beneficiary type
 *     tags: [Beneficiary Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Beneficiary Type ID
 *     responses:
 *       204:
 *         description: Beneficiary type deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), beneficiaryTypeController.deleteBeneficiaryType);

module.exports = router;
