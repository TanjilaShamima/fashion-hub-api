/**
 * @file src/schemas/transactionSchema.js
 * @description This file defines the schema for transaction data validation using Joi.
 */

const Joi = require("joi");

const transactionSchema = Joi.object({
  userId: Joi.integer().required(),
  amount: Joi.number().min(0).required(),
  method: Joi.string().valid("credit_card", "paypal", "bank_transfer", "sslcommerz", "bkash", "stripe").required(),
  currency: Joi.string().valid("USD", "BDT").default("BDT"),
  status: Joi.string().valid("pending", "completed", "failed").required(),
  transactionId: Joi.string().optional(),
  createdAt: Joi.date().default(Date.now),
  updatedAt: Joi.date().default(Date.now)
});

module.exports = transactionSchema;
/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
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