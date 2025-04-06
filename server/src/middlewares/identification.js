const { UnAuthorizedException } = require("../exceptions/errors.exceptions");

const identification = (req, res, next) => {
    console.log(req.headers);
    const token = req.cookies.access_token;
    if (!token) throw new UnAuthorizedException();
};

module.exports = { identification };
