const successResponse = (res, statusCode, status, data, message) => {
    response = {};
    response.data = data;
    response.message = message;
    response.status = status;
    return res.status(statusCode).json(response);
};

module.exports = { successResponse };
