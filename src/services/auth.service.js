const bcrypt = require("bcrypt");
const { generateToken }= require("../utils/jwt");

const userModel = require("../models/user.model");

const AppError = require("../utils/AppError");

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

/**
 * Register a new user
 */
const registerUser = async ({ name, email, password }) => {
    // Check if email already exists
    const existingUser = userModel.findUserByEmail(email);

    if (existingUser) {
        throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = userModel.createUser({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(
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

const loginUser = async ({ email, password }) => {
    const user = userModel.findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};

module.exports = {
    registerUser,
    loginUser,
};