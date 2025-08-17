const router = require("express").Router();

const {
  addNewPayment,
  getAllPayments,
  makeDefaultPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Payment management APIs
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         cardNumber:
 *           type: string
 *         cardHolder:
 *           type: string
 *         expiryDate:
 *           type: string
 *         paymentType:
 *           type: string
 *         isDefault:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /payments:
 *   post:
 *     summary: Add a new payment method
 *     security:
 *       - bearerAuth: []
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardNumber:
 *                 type: string
 *               cardHolder:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *               paymentType:
 *                 type: string
 *             required:
 *               - cardNumber
 *               - cardHolder
 *               - expiryDate
 *               - paymentType
 *     responses:
 *       201:
 *         description: Payment method added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *   get:
 *     summary: Get all payment methods
 *     security:
 *       - bearerAuth: []
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of payment methods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *
 * /payments/default/{id}:
 *   patch:
 *     summary: Make a payment method default
 *     security:
 *       - bearerAuth: []
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment method ID
 *     responses:
 *       200:
 *         description: Payment method set as default
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment method not found
 *
 * /payments/{id}:
 *   get:
 *     summary: Get payment method by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment method ID
 *     responses:
 *       200:
 *         description: Payment method details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment method not found
 *   put:
 *     summary: Update payment method by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment method ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardNumber:
 *                 type: string
 *               cardHolder:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *               paymentType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment method updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment method not found
 *   delete:
 *     summary: Delete payment method by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Payment method ID
 *     responses:
 *       204:
 *         description: Payment method deleted successfully
 *       404:
 *         description: Payment method not found
 *
 */

router.post("/", isLoggedIn, addNewPayment);
router.get("/", isLoggedIn, getAllPayments);
router.patch("/:id/default", isLoggedIn, makeDefaultPayment);
router.get("/:id", isLoggedIn, getPaymentById);
router.put("/:id", isLoggedIn, updatePaymentById);
router.delete("/:id", isLoggedIn, deletePaymentById);

module.exports = router;
