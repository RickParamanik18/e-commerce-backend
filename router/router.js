const express = require("express");
const router = express.Router();
const authRouter = require("./routes/auth.router");
const productRouter = require("./routes/product.router");
const cartRouter = require("./routes/cart.router");

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);

module.exports = router;
