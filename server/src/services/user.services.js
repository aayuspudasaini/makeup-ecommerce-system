const User = require("../models/user.model");
const { BadRequestException } = require("../exceptions/errors.exceptions");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const userService = {
    findAll: async () => {
        const data = await User.find({}).sort({ createdAt: -1 });
        return data;
    },
    // Register a new user
    register: async (data) => {
        // Check if the email is already registered
        const isExist = await User.exists({ email: data.email });

        if (isExist) {
            throw new BadRequestException("Email is already registered.");
        }

        // Create a new user
        const newUser = await User.create(data);

        return newUser;
    },

    // Authenticate a user
    login: async (data) => {
        // Find the user by email
        const user = await User.findOne({ email: data.email });

        if (!user) {
            throw new BadRequestException("Invalid email or password.");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(data.password);

        if (!isMatch) {
            throw new BadRequestException("Invalid email or password.");
        }

        const access_token = generateAccessToken({ userId: user._id });

        const refresh_token = generateRefreshToken({ userId: user._id });

        return { user, access_token, refresh_token };
    },
};

module.exports = { userService };
