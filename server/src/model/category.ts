import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    image?: string; // Optional field for the image URL or path
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false }, // Add the image field
});

export default mongoose.model<ICategory>("Category", CategorySchema);