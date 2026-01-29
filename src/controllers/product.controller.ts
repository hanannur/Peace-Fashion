import { Request, Response } from "express";
import Product from "../models/product";

// CREATE
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category, image, stockQuantity } = req.body;

    if (!name || !price || !category || !image || !stockQuantity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (price < 0 || stockQuantity < 0) {
      return res.status(400).json({ message: "Price and stock must be positive" });
    }

    const product = await Product.create({
      name,
      price,
      category,
      image,
      stockQuantity,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

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
