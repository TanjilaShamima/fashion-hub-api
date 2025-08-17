/**
 * @file transactionModel.js
 * @description This file defines the model for transaction.
 */


const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const Transactions = sequelize.define("Transactions", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  method: {
    type: DataTypes.ENUM("credit_card", "paypal", "bank_transfer", "sslcommerz", "bkash", "stripe"),
    allowNull: false
  },
  currency: {
    type: DataTypes.ENUM("USD", "BDT"),
    defaultValue: "BDT"
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    allowNull: false
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Transactions;
