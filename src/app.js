const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({
    extended: true,
    limit: "10kb"
}));

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests, please try again later"
    }
});

app.use(generalLimiter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "User Authentication API is running"
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

module.exports = app;
