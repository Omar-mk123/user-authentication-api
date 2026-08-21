const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    getUserById,
    updateUserByAdmin,
    deleteUserByAdmin
} = require("../controllers/admin.controller");

const {
    protect,
    authorize
} = require("../middleware/auth.middleware");

const {
    adminUpdateUserValidation
} = require("../validators/auth.validator");

router.get(
    "/users",
    protect,
    authorize("admin"),
    getAllUsers
);

router.get(
    "/users/:id",
    protect,
    authorize("admin"),
    getUserById
);

router.patch(
    "/users/:id",
    protect,
    authorize("admin"),
    adminUpdateUserValidation,
    updateUserByAdmin
);

router.delete(
    "/users/:id",
    protect,
    authorize("admin"),
    deleteUserByAdmin
);

module.exports = router;
