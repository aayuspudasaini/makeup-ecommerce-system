import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: ICategory["_id"]; // Reference to Category
    image: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
