const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { isAuthorized } = require("../../middlewares/isAuthorized");

router.get("/login", authController.login);
router.post("/signin", authController.signin);
router.get("/logout", isAuthorized, authController.logout);

module.exports = router;
