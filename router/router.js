const express = require("express");
const router = express.Router();
const authRouter = require("./routes/auth.router");
const productRouter = require("./routes/product.router");
const cartRouter = require("./routes/cart.router");
const orderRouter = require("./routes/order.router");

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);

module.exports = router;
