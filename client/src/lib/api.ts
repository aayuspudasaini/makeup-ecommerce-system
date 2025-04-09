import { z } from "zod";
import API from "./axios-client";
import { SignInSchema, SignUpSchema } from "./validation";

/**
 * @desc All of the authentication routes are handled here
 * @method POST
 * @routes
 * Login Routes, Register Routes
 */
export const signUp = async (data: z.infer<typeof SignUpSchema>) =>
    await API.post("/register", data);

export const signIn = async (data: z.infer<typeof SignInSchema>) =>
    await API.post("/login", data);

/**
 * @desc List of all the user routes are listed here.
 */

export const getAllUser = async () => await API.get("/users");


/**
 * @description This file contains all the API routes related to carousel management.
 * These routes allow for the retrieval, creation, updating, and deletion of carousel.
 * 
 * @method GET - Retrieves a list of all carousel.
 * @method POST - Creates a new carousel.
 * @method GET - Retrieves a specific carousel by its ID.
 * @method PATCH - Updates an existing carousel by its ID.
 * @method DELETE - Deletes a carousel by its ID.
 */

export const getAllCarousel = async () => await API.get("/carousel");

export const createCarouselMutationFn = async (formData: FormData) => await API.post("/carousel", formData);

export const getCarouselById = async (id: string) => await API.get(`/carousel/${id}`);

export const updateCarouselMutationFn = async (id: string, formData: FormData) => await API.patch(`/carousel/${id}`, formData);

export const deleteCarouselMutationFn = async (id: string) => await API.delete(`/carousel/${id}`);





/**
 * @description This file contains all the API routes related to category management.
 * These routes allow for the retrieval, creation, updating, and deletion of categories.
 * 
 * @method GET - Retrieves a list of all categories.
 * @method POST - Creates a new category.
 * @method GET - Retrieves a specific category by its ID.
 * @method PATCH - Updates an existing category by its ID.
 * @method DELETE - Deletes a category by its ID.
 */

export const getAllCategory = async () => await API.get("/category");

export const createCategoryMutationFn = async (formData: FormData) => await API.post("/category", formData);

export const getCategoryById = async (id: string) => await API.get(`/category/${id}`);

export const updateCategoryMutationFn = async (id: string, formData: FormData) => await API.patch(`/category/${id}`, formData);

export const deleteCategoryMutationFn = async (id: string) => await API.delete(`/category/${id}`);

/**
 * @description All the routes that are been carried out for carousels are listed below:
 * @method GET
 */

// GET Carousel


// POST Carousel
// export const createC = async () => await API.get("/carousel");

// UPDATE Carousel

// DELETE Carousel


export const uploadMutationFn = async (data: any) => {
    console.log("API FROM FRONTEND", data);
    // await API.post("/upload", data.upload[0]);
};