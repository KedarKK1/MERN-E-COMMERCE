const express = require('express');
const { getAllProducts, createProduct, getProductDetails, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview } = require('../controllers/productControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// middleware for authenticated user so only logged in users can access products
router.route("/product").get(isAuthenticatedUser, getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
// got an casttype error here, this was because i was putting /:id instead of /:_id here
// phirse error aaya to :id pe change kar diya, everything is now fine
// Note - req.params.id is just a hexadecomal code do not use anything except from 0-f so use regex here that will give html error
router.route("/admin/product/:id([0-9a-f]{24})").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser,deleteProduct);

router.route("/product/:id([0-9a-f]{24})").get(getProductDetails);

// Note- reviews may not work perfectly
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router
