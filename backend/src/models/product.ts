import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  image: string;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    stockQuantity: { type: Number, required: true, min: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
