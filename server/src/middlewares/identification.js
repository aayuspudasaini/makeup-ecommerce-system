const { UnAuthorizedException } = require("../exceptions/errors.exceptions");

const { verifySignJwt } = require("../utils/token");

const identification = (req, res, next) => {
    const token =
        req.cookies.access_token || req.header("Authorization")?.split(" ")[1];

    if (!token) throw new UnAuthorizedException();

    const decodeToken = verifySignJwt(token);

    if (!decodeToken) throw new UnAuthorizedException("Invalid Token");

    req.userId = decodeToken.userId;

    next();
};

module.exports = { identification };
