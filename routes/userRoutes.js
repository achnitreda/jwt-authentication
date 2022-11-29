const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get('/logout', authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// api/auth/confirm/:token 
// router.get("/confirm/:token", authController.verifyEmail);

router.get("/all", authController.protect, userController.allAccess);
router.get(
  "/admin",
  authController.protect,
  authController.restrictTo('admin'),
  userController.adminBoard
);
router.get("/mod", userController.modBoard);
router.get("/user", userController.userBoard);

module.exports = router;
