const Reviews = require("../models/reviewModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const createError = require("http-errors");
const { successResponse } = require("../services/response");
const logger = require("../utils/logger");

const addNewReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, rating, comment } = req.body;
    if (!productId || !rating) throw createError(400, "productId and rating are required");
    const review = await Reviews.create({ userId, productId, rating, comment });
    successResponse(res, {
      statusCode: 201,
      message: "Review created successfully",
      payload: { review },
    });
  } catch (error) {
    throw createError(error.status || 500, error.message || "Failed to add review");
  }
};

const getAllReviews = async (req, res) => {
  try {
    const productId = req.params.id; // <-- Fix: get from params, not query
    logger.info(`Fetching reviews for product ID: ${productId}`);
    
    // want to populate product and user from productId and userId
    const reviews = await Reviews.findAll({
      where: { productId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "images", "price"]
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName", "email", "image"]
        }
      ]
    });
    successResponse(res, {
      statusCode: 200,
      message: "Reviews retrieved successfully",
      payload: { reviews },
    });
  } catch (error) {
    throw createError(error.status || 500, error.message || "Failed to get reviews");
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findByPk(id);
    if (!review) throw createError(404, "Review not found");
    successResponse(res, {
      statusCode: 200,
      message: "Review retrieved successfully",
      payload: { review },
    });
  } catch (error) {
    throw createError(error.status || 500, error.message || "Failed to get review");
  }
};

const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await Reviews.findByPk(id);
    if (!review) throw createError(404, "Review not found");
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await review.save();
    successResponse(res, {
      statusCode: 200,
      message: "Review updated successfully",
      payload: { review },
    });
  } catch (error) {
    throw createError(error.status || 500, error.message || "Failed to update review");
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findByPk(id);
    if (!review) throw createError(404, "Review not found");
    await review.destroy();
    successResponse(res, {
      statusCode: 204,
      message: "Review deleted successfully",
    });
  } catch (error) {
    throw createError(error.status || 500, error.message || "Failed to delete review");
  }
};

module.exports = {
  addNewReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
