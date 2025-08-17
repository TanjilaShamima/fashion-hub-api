const Payments = require("../models/paymentModel");

const addNewPayment = async (req, res) => {
  try {
    // const paymentData = await paymentSchema.validateAsync(req.body);
    const newPayment = await Payments.create(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const makeDefaultPayment = async (req, res) => {
  try {
    const { id } = req.params;
    await Payments.update({ isDefault: false }, { where: {} });
    await Payments.update({ isDefault: true }, { where: { id } });
    res.status(200).json({ message: "Payment method set as default" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    // const paymentData = await paymentSchema.validateAsync(req.body);
    const [updated] = await Payments.update(paymentData, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    const updatedPayment = await Payments.findByPk(id);
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Payments.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const stripePayment = async (req, res) => {
  try {
    // Implement Stripe payment logic here
    res.status(200).json({ message: "Stripe payment processed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const bkashPayment = async (req, res) => {
  try {
    // Implement bKash payment logic here
    res.status(200).json({ message: "bKash payment processed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const sslPayment = async (req, res) => {
  try {
    // Implement SSLCommerz payment logic here
    res.status(200).json({ message: "SSLCommerz payment processed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addNewPayment,
  getAllPayments,
  makeDefaultPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
  stripePayment,
  bkashPayment,
  sslPayment,
};
