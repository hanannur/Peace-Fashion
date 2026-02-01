import { Router } from "express";
import Product from "../models/product";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/role.middleware";
import upload from "../middleware/upload";

const router = Router();

router.get('/teasers', async (req, res) => {
  try {
    const teasers = await Product.find({ isFeatured: true }).limit(3);
    res.json(teasers);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});



router.get("/", getProducts); // everyone logged in can see
router.get("/:id", protect, getProductById);

router.post("/", protect, adminOnly, upload.single("image"), createProduct); // admin only
router.patch("/:id", protect, adminOnly, upload.single("image"), updateProduct); // admin only
router.delete("/:id", protect, adminOnly, deleteProduct); // admin only
router.post('/', protect ,adminOnly, createProduct);

export default router;
