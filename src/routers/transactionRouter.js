const router = require("express").Router();

const {
  stripePayment,
  bkashPayment,
  sslPayment,
} = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: Transaction processing APIs (Stripe, bKash, SSLCOMMERZ)
 * /transactions/stripe:
 *   post:
 *     summary: Make a payment using Stripe
 *     security:
 *       - bearerAuth: []
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               stripeToken:
 *                 type: string
 *             required:
 *               - amount
 *               - currency
 *               - stripeToken
 *     responses:
 *       200:
 *         description: Stripe payment successful
 *       400:
 *         description: Payment failed
 *
 * /transactions/bkash:
 *   post:
 *     summary: Make a payment using bKash
 *     security:
 *       - bearerAuth: []
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               bkashTransactionId:
 *                 type: string
 *             required:
 *               - amount
 *               - bkashTransactionId
 *     responses:
 *       200:
 *         description: bKash payment successful
 *       400:
 *         description: Payment failed
 *
 * /transactions/sslcommerz:
 *   post:
 *     summary: Make a payment using SSLCOMMERZ
 *     security:
 *       - bearerAuth: []
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               tran_id:
 *                 type: string
 *             required:
 *               - amount
 *               - tran_id
 *     responses:
 *       200:
 *         description: SSLCOMMERZ payment successful
 *       400:
 *         description: Payment failed
 */

router.post("/stripe", isLoggedIn, stripePayment);
router.post("/bkash", isLoggedIn, bkashPayment);
router.post("/sslcommerz", isLoggedIn, sslPayment);

module.exports = router;
