import { z } from "zod";
import API from "./axios-client";
import { categorySchema, SignUpSchema } from "./validation";

/**
 * @desc All of the authentication routes are handled here
 * @method POST
 */
export const signUp = async (data: z.infer<typeof SignUpSchema>) =>
    await API.post("/register", data);

export const signIn = async () => await API.post("/login");

/**
 * @desc List of all the user routes are listed here.
 */

export const getAllUser = async () => await API.get("/users");

/**
 * @description All the routes that are been carried out for category are listed below:
 * @method GET
 */

export const getAllCategory = async () => await API.get("/category");

export const createCategoryMutationFn = async (
    data: z.infer<typeof categorySchema>
) => {
    data.image = data.image[0];
    console.log(data)
    await API.post("/category", data);
};

export const uploadMutationFn = async (data: any) => {
    console.log(data.image[0] as File);
    await API.post("/upload", data.image[0] as File);
};

export const deleteCategoryMutationFn = async (id: string) =>
    await API.delete(`/category/${id}`);

/**
 * @description All the routes that are been carried out for carousels are listed below:
 * @method GET
 */

// GET Carousel
export const getAllCarousel = async () => await API.get("/carousel");

// POST Carousel
// export const createC = async () => await API.get("/carousel");

// UPDATE Carousel

// DELETE Carousel
export const deleteCarouselMutationFn = async (id: string) =>
    await API.delete(`/carousel/${id}`);
