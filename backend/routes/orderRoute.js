const express = require("express");
const { newOrder, getSingleOrder, myOrders, getallOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();


router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getallOrders);

router.route("/admin/orders/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;