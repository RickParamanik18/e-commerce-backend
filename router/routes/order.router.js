const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order.controller");
const { isAuthorized } = require("../../middlewares/isAuthorized");

router.post("/", isAuthorized, orderController.placeOrder);
router.get("/history", isAuthorized, orderController.orderHistory);
router.get("/detail", isAuthorized, orderController.orderDetail);

module.exports = router;
