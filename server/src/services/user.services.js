const User = require("../models/user.model");
const { BadRequestException } = require("../exceptions/errors.exceptions");
const jwt = require("jsonwebtoken");

const userService = {
    // Register a new user
    register: async (data) => {
        // Check if the email is already registered
        const isExist = await User.exists({ email: data.email });
        if (isExist) {
            throw new BadRequestException("Email is already registered.");
        }

        // Create a new usergit
        const newUser = await User.create(data);

        // Remove sensitive fields before returning
        const { password, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
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

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return token;
    },
};

module.exports = { userService };
