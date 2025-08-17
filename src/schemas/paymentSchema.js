/**
 * @file src/schemas/paymentSchema.js
 * @description This file defines the schema for payment data validation using Joi.
 */

const Joi = require("joi");

const paymentSchema = Joi.object({
  userId: Joi.integer().required(),
  cardNumber: Joi.string().required(),
  cardHolder: Joi.string().required(),
  expiryDate: Joi.string().required(), // MM/YYYY format
  method: Joi.string().valid("credit_card", "paypal", "bank_transfer", "sslcommerz", "bkash", "stripe").required(),
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now)
});

module.exports = paymentSchema;
/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *           minimum: 0
 *         method:
 *           type: string
 *           enum: [credit_card, paypal, bank_transfer]
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */