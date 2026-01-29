import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/role.middleware";

const router = Router();

router.get("/", protect, getProducts); // everyone logged in can see
router.get("/:id", protect, getProductById);

router.post("/", protect, adminOnly, createProduct); // admin only
router.put("/:id", protect, adminOnly, updateProduct); // admin only
router.delete("/:id", protect, adminOnly, deleteProduct); // admin only

export default router;
