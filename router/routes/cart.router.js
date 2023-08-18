const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart.controller");
const { isAuthorized } = require("../../middlewares/isAuthorized");

router.get("/", isAuthorized, cartController.getCart);
router.post("/", isAuthorized, cartController.addToCart);
router.put("/", isAuthorized, cartController.updateCart);
router.delete("/", isAuthorized, cartController.deleteFromCart);

module.exports = router;
