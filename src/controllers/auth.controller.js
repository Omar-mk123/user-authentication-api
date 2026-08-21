const {
    sendSuccess,
    sendError
} = require("../utils/response");
const authService = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const result = await authService.registerUser(
            name,
            email,
            password
        );

        return sendSuccess(
            res,
            201,
            "User registered successfully",
            result
        );

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(
            email,
            password
        );

        return sendSuccess(
            res,
            200,
            "Login successful",
            result
        );

    } catch (error) {
        next(error);
    }
};
const getMe = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user = await authService.updateUserProfile(
            req.user.id,
            name,
            email
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        const result = await authService.deleteUser(req.user.id);

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        const result = await authService.changePassword(
            req.user._id,
            currentPassword,
            newPassword
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
    register,
    login,
    getMe,
    updateProfile,
    deleteAccount,
    changePassword
};
