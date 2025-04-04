import API from "./axios-client";

/**
 * @desc All of the carousel routes are listed here.
 * @method GET -
 * @method POST -
 * @method PATCH -
 * @method Delete -
 */

export const getAllCarousel = async () => await API.get("/carousel");

/**
 * @desc All of the CAtegory routes are listed here.
 * @method GET -
 * @method POST -
 * @method PATCH -
 * @method Delete -
 */

export const getAllCategory = async () => await API.get("/category");
