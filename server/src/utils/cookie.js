const { config } = require("../config/app.config");

const defaults = {
    httpOnly: true,
    //secure: config.NODE_ENV === "production" ? true : false,
    //sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
};

const getAccessTokenCookieOptions = () => {
    const expiresIn = 1 * 24 * 60 * 60;
    return {
        ...defaults,
        expiresIn,
        path: "/",
    };
};

const getRefreshTokenCookieOptions = () => {
    const expiresIn = 7 * 24 * 60 * 60;
    return {
        ...defaults,
        expiresIn,
        path: "/",
    };
};

const setAuthenticationCookie = (res, access_token, refresh_token) => {
    res.cookie(
        "access_token",
        access_token,
        getAccessTokenCookieOptions()
    ).cookie("refresh_token", refresh_token, getRefreshTokenCookieOptions());
};

const clearAuthenticationCookies = (res) =>
    res
        .clearCookie("access_token", {
            path: REFRESH_PATH,
        })
        .clearCookie("refresh_token", {
            path: REFRESH_PATH,
        });

module.exports = { setAuthenticationCookie, clearAuthenticationCookies };
