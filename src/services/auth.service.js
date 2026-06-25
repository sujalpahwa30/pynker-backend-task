const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

/**
 * Register a new user
 */
const registerUser = async ({ name, email, password }) => {
    // Check if email already exists
    const existingUser = userModel.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = userModel.createUser({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        {
            id: result.lastInsertRowid,
            email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );

    return {
        user: {
            id: result.lastInsertRowid,
            name,
            email,
        },
        token,
    };
};

module.exports = {
    registerUser,
};