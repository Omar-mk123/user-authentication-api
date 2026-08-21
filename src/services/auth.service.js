const User = require("../models/user.model");

const {
    hashPassword,
    comparePassword
} = require("../utils/password");

const {
    generateToken
} = require("../utils/jwt");

const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("Email is already registered");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id.toString());

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordCorrect = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id.toString());

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

const updateUserProfile = async (userId, name, email) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (email && email !== user.email) {
        const emailExists = await User.findOne({
            email,
            _id: { $ne: userId }
        });

        if (emailExists) {
            const error = new Error("Email is already registered");
            error.statusCode = 409;
            throw error;
        }

        user.email = email;
    }

    if (name) {
        user.name = name;
    }

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt
    };
};

const deleteUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    await User.findByIdAndDelete(userId);

    return {
        message: "Account deleted successfully"
    };
};

const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select("+password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const isCurrentPasswordCorrect = await comparePassword(
        currentPassword,
        user.password
    );

    if (!isCurrentPasswordCorrect) {
        const error = new Error("Current password is incorrect");
        error.statusCode = 401;
        throw error;
    }

    if (newPassword.length < 6) {
        const error = new Error(
            "New password must be at least 6 characters"
        );
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;

    await user.save();

    return {
        message: "Password changed successfully"
    };
};

const updateUserByAdmin = async (userId, data) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const { name, email, role } = data;

    if (email && email !== user.email) {
        const emailExists = await User.findOne({
            email,
            _id: { $ne: userId }
        });

        if (emailExists) {
            const error = new Error("Email is already registered");
            error.statusCode = 409;
            throw error;
        }

        user.email = email.toLowerCase().trim();
    }

    if (name) {
        user.name = name.trim();
    }

    if (role) {
        if (!["user", "admin"].includes(role)) {
            const error = new Error("Invalid role");
            error.statusCode = 400;
            throw error;
        }

        user.role = role;
    }

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt
    };
};

const deleteUserByAdmin = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    await User.findByIdAndDelete(userId);

    return {
        message: "User deleted successfully"
    };
};



module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateUserProfile,
    deleteUser,
    changePassword,
    updateUserByAdmin,
    deleteUserByAdmin
};
