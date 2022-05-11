const express = require('express');
const { getAllProducts, createProduct, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productControllers');

const router = express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(createProduct);
// got an casttype error here, this was because i was putting /:id instead of /:_id here
// phirse error aaya to :id pe change kar diya, everything is now fine
// Note - req.params.id is just a hexadecomal code do not use anything except from 0-f so use regex here that will give html error
router.route("/product/:id([0-9a-f]{24})").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router
