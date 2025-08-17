/**
 * @file paymentModel.js
 * @description This file defines the model for payment.
 */

const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const Payments = sequelize.define("Payments", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM(
    //   "credit_card",
    //   "paypal",
    //   "bank_transfer",
      "sslcommerz",
    //   "bkash",
      "stripe"
    ),
    allowNull: false,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cardHolder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Payments;
