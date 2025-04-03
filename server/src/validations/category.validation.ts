import { object, string } from "zod";

export const categorySchema = object({
    name: string().min(1, "Name is required").max(16, "Name must be at least 6 characters long."),
    description: string().optional(),
    image: string().optional()
});