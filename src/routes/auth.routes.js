const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const {
    register,
    login,
    getMe,
    updateProfile,
    deleteAccount,
    changePassword
} = require("../controllers/auth.controller");

const {
    protect
} = require("../middleware/auth.middleware");

const {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation
} = require("../validators/auth.validator");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Too many authentication attempts. Try again later."
    }
});

router.post(
    "/register",
    authLimiter,
    registerValidation,
    register
);

router.post(
    "/login",
    authLimiter,
    loginValidation,
    login
);

router.get(
    "/me",
    protect,
    getMe
);

router.patch(
    "/me",
    protect,
    updateProfileValidation,
    updateProfile
);

router.patch(
    "/change-password",
    protect,
    changePasswordValidation,
    changePassword
);

router.delete(
    "/me",
    protect,
    deleteAccount
);

module.exports = router;
