const {
    sendError
} = require("../utils/response");

const errorMiddleware = (err, req, res, next) => {
    console.error("ERROR:", err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    if (err.code === 11000) {
        statusCode = 409;

        const field = Object.keys(err.keyValue)[0];

        message = `${field} already exists`;
    }

    if (err.name === "ValidationError") {
        statusCode = 400;

        const errors = Object.values(err.errors).map(
            error => error.message
        );

        return sendError(
            res,
            statusCode,
            "Validation failed",
            errors
        );
    }

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token has expired";
    }

    return sendError(
        res,
        statusCode,
        message
    );
};

module.exports = errorMiddleware;
