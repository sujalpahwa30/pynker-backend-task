const { verifyToken } = require("../utils/jwt");
const userModel = require("../models/user.model");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing",
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization format",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        const user = userModel.findUserById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authenticate;