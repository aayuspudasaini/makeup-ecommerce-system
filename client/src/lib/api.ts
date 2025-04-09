import { z } from "zod";
import API from "./axios-client";
import {
    appointmentBookingSchema,
    classBookingSchema,
    scheduleValidation,
    SignInSchema,
    SignUpSchema,
} from "./validation";

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

export const createCarouselMutationFn = async (formData: FormData) =>
    await API.post("/carousel", formData);

export const getCarouselById = async (id: string) =>
    await API.get(`/carousel/${id}`);

export const updateCarouselMutationFn = async (
    id: string,
    formData: FormData
) => await API.patch(`/carousel/${id}`, formData);

export const deleteCarouselMutationFn = async (id: string) =>
    await API.delete(`/carousel/${id}`);

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

export const createCategoryMutationFn = async (formData: FormData) =>
    await API.post("/category", formData);

export const getCategoryById = async (id: string) =>
    await API.get(`/category/${id}`);

export const updateCategoryMutationFn = async (
    id: string,
    formData: FormData
) => await API.patch(`/category/${id}`, formData);

export const deleteCategoryMutationFn = async (id: string) =>
    await API.delete(`/category/${id}`);

/**
 * @description This file contains all the API routes related to appointment management.
 * These routes allow for the retrieval, creation, updating, and deletion of appointment.
 *
 * @method GET - Retrieves a list of all appointment.
 * @method POST - Creates a new appointment.
 * @method GET - Retrieves a specific appointment by its ID.
 * @method PATCH - Updates an existing appointment by its ID.
 * @method DELETE - Deletes a appointment by its ID.
 */

export const getAllAppointment = async () => await API.get("/appointment");

export const createAppointmentMutationFn = async (
    data: z.infer<typeof appointmentBookingSchema>
) => await API.post("/appointment", data);

export const getAppointmentById = async (id: string) =>
    await API.get(`/appointment/${id}`);

export const updateAppointmentMutationFn = async (
    id: string,
    data: z.infer<typeof scheduleValidation>
) => await API.patch(`/appointment/${id}`, data);

export const deleteAppointmentMutationFn = async (id: string) =>
    await API.delete(`/appointment/${id}`);

/**
 * @description This file contains all the API routes related to class booking management.
 * These routes allow for the retrieval, creation, updating, and deletion of class booking.
 *
 * @method GET - Retrieves a list of all class booking.
 * @method POST - Creates a new class booking.
 * @method GET - Retrieves a specific class booking by its ID.
 * @method PATCH - Updates an existing class booking by its ID.
 * @method DELETE - Deletes a class booking by its ID.
 */

export const getAllClass = async () => await API.get("/class");

export const createClassMutationFn = async (
    data: z.infer<typeof classBookingSchema>
) => await API.post("/class", data);

export const getClassById = async (id: string) => await API.get(`/class/${id}`);

export const updateClassMutationFn = async (
    id: string,
    data: z.infer<typeof classBookingSchema>
) => await API.patch(`/class/${id}`, data);

export const deleteClassMutationFn = async (id: string) =>
    await API.delete(`/class/${id}`);

export const uploadMutationFn = async (data: any) => {
    console.log("API FROM FRONTEND", data);
    // await API.post("/upload", data.upload[0]);
};
