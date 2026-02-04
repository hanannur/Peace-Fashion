import { Request, Response } from "express";
import Product from "../models/product";

import { v2 as cloudinary } from "cloudinary";
// CREATE
// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     const { name, price, category, image, stockQuantity } = req.body;

//     if (!name || !price || !category || !image || !stockQuantity||image
      
//     ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     if (price < 0 || stockQuantity < 0) {
//       return res.status(400).json({ message: "Price and stock must be positive" });
//     }

//     const product = await Product.create({
//       name,
//       price,
//       category,
//       image,
//       stockQuantity,
//     });

//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const createProduct = async (req: Request, res: Response) => {
  try {
    // 1. Pull the new isFeatured field from the body
    const { name, price, category, image, stockQuantity, isFeatured } = req.body;

    // 2. Corrected Validation: Check if any field is MISSING
    if (!name || !price || !category || !image || !stockQuantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (Number(price) < 0 || Number(stockQuantity) < 0) {
      return res.status(400).json({ message: "Price and stock must be positive" });
    }

    // 3. Save to Database
    const product = await Product.create({
      name,
      price: Number(price),
      category,
      image, // This is the URL string
      stockQuantity: Number(stockQuantity),
      isFeatured: isFeatured === true || isFeatured === "true", // Handle both
    });

    res.status(201).json(product);
  } catch (error: any) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// interface CreateProductData {
//   name: string;
//   price: string;
//   category: string;
//   stockQuantity: string;
//   isFeatured?: string;
//   file: File;
// }
// // CREATE
// export const createProduct = async ({
//   name,
//   price,
//   category,
//   stockQuantity,
//   isFeatured,
//   file,
// }: CreateProductData) => {
//   if (!file || !name || !price || !category || !stockQuantity) {
//     throw new Error("All fields and an image are required");
//   }

//   // Convert file → buffer
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   // Upload to Cloudinary
//   const uploadResult: any = await new Promise((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       { folder: "products" },
//       (error, result) => {
//         if (error) reject(error);
//         resolve(result);
//       }
//     ).end(buffer);
//   });

//   // Save to DB
//   const product = await Product.create({
//     name,
//     price: parseFloat(price),
//     category,
//     image: uploadResult.secure_url,
//     stockQuantity: parseInt(stockQuantity),
//     isFeatured: isFeatured === "true",
//   });

//   return product;
// };
// GET ALL
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// GET ONE
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE (Admin only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category, image, stockQuantity } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ✅ Optional field validation
    if (price !== undefined && price < 0)
      return res.status(400).json({ message: "Price must be positive" });

    if (stockQuantity !== undefined && stockQuantity < 0)
      return res.status(400).json({ message: "Stock must be positive" });

    // Update fields if provided
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (image !== undefined) product.image = image;
    if (stockQuantity !== undefined) product.stockQuantity = stockQuantity;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE (Admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
