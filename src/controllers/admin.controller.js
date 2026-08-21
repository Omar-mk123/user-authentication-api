const {
    sendSuccess
} = require("../utils/response");
const User = require("../models/user.model");
const authService = require("../services/auth.service");

// GET ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                parseInt(req.query.limit) || 10,
                1
            ),
            100
        );

        const search = req.query.search?.trim() || "";

        const skip = (page - 1) * limit;

        const filter = {};

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const [users, totalUsers] = await Promise.all([
            User.find(filter)
                .select("-password")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),

            User.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            pagination: {
                page,
                limit,
                totalUsers,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            },
            data: users
        });

    } catch (error) {
        next(error);
    }
};

// GET USER BY ID
const getUserById = async (req, res, next) => {
    try {
        const user = await User
            .findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE USER BY ADMIN
const updateUserByAdmin = async (req, res, next) => {
    try {
        const user = await authService.updateUserByAdmin(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const deleteUserByAdmin = async (req, res, next) => {
    try {
        const result = await authService.deleteUserByAdmin(
            req.params.id
        );

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserByAdmin,
    deleteUserByAdmin
};
