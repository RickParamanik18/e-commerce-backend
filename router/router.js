const express = require("express");
const router = express.Router();
const authRouter = require("./routes/auth.router");
const productRouter = require("./routes/product.router");

router.use("/auth", authRouter);
router.use("/product", productRouter);

module.exports = router;
