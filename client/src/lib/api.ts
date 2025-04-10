import { z } from "zod";
import API from "./axios-client";
import { categorySchema, SignInSchema, SignUpSchema } from "./validation";

/**
 * @desc All of the authentication routes are handled here
 * @method POST
 * @routes
 * Login Routes, Register Routes
 */
export const signUp = async (data: z.infer<typeof SignUpSchema>) => await API.post("/register", data);

export const signIn = async (data: z.infer<typeof SignInSchema>) => await API.post("/login", data);

/**
 * @desc List of all the user routes are listed here.
 */

export const getAllUser = async () => await API.get("/users");

/**
 * @description All the routes that are been carried out for category are listed below:
 * @method GET
 */

export const getAllCategory = async () => await API.get("/category");

export const createCategoryMutationFn = async (formData: FormData) => await API.post("/category", formData);


export const uploadMutationFn = async (data: any) => {
    console.log("API FROM FRONTEND", data);
    // await API.post("/upload", data.upload[0]);
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
