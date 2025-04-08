const jwt = require("jsonwebtoken");
const { config } = require("../config/app.config");

const accessTokenSignOptions = {
    secret: config.JWT.SECRET,
    expiresIn: config.JWT.EXPIRES_IN,
};

const refreshTokenSignOptions = {
    secret: config.JWT.REFRESH_SECRET,
    expiresIn: config.JWT.REFRESH_EXPIRES_IN,
};

const generateAccessToken = (payload) => {
    const { secret, ...opts } = accessTokenSignOptions;
    return jwt.sign(payload, secret, { ...opts });
};

const generateRefreshToken = (payload) => {
    const { secret, ...opts } = refreshTokenSignOptions;
    return jwt.sign(payload, secret, { ...opts });
};

const verifySignJwt = (token) => {
    const { secret, ...opts } = accessTokenSignOptions;
    return jwt.verify(token, secret, { ...opts });
};

module.exports = { generateAccessToken, generateRefreshToken, verifySignJwt };
