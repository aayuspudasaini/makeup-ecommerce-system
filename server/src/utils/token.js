const jwt = require("jsonwebtoken");
const { config } = require("../config/app.config");

const accessTokenSignOptions = {
    secret: config.JWT.SECRET,
    expiresIn: config.JWT.EXPIRES_IN,
};

const generateAccessToken = (payload) => {
    const { secret, ...opts } = accessTokenSignOptions;
    return jwt.sign(payload, secret, { ...opts });
};

const verifySignJwt = (token) => {
    const { secret, ...opts } = accessTokenSignOptions;
    const payload = jwt.verify(token, secret, { ...opts });
    return { payload };
};

module.exports = { generateAccessToken, verifySignJwt };
