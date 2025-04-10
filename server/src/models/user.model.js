const { Schema, model } = require("mongoose");
const { slugify } = require("../utils/slugify");
const { comparePassword, makePassword } = require("../utils/hash");

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, default: "/public/images/default-avatar.jpg" },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        resetToken: { type: String },
    },
    { timestamps: true, toJSON: {} }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await makePassword(this.password);
    }
    next();
});

// Generate slug from name before saving
userSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name);
    }
    next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (value) {
    return comparePassword(value, this.password);
};

// Remove sensitive fields from JSON output
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

const User = model("User", userSchema);

module.exports = User;
