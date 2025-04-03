const { Schema, model } = require("mongoose");
const { makePassword, comparePassword } = require("../utils/hash");

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        resetToken: { type: String },
    },
    { timestamps: true, toJSON: {} }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await makePassword(this.password);
    }
    next();
});

userSchema.methods.comparePassword = async function (value) {
    return comparePassword(value, this.password);
};

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

const User = model < UserDocument > ("User", userSchema);

module.exports = User;
