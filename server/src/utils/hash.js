const bcrypt = require("bcryptjs");

const makePassword = async (password) => {
    const saltRound = await bcrypt.genSalt(10);
    return bcrypt.hash(password, saltRound);
};

const comparePassword = async (value, password) => {
    return bcrypt.compare(value, password);
};

module.exports = { makePassword, comparePassword };
