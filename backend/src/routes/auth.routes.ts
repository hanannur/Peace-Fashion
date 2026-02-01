import { Router } from "express";
import { deleteUser, getAllUsers, getProfile, login, logout, register, updatePassword } from "../controllers/auth.controller";
import {  protect } from "../middleware/auth.middleware"; 
const router = Router();

router.post("/register", register);
router.post("/login", login); 
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
router.get("/users", protect, getAllUsers); 
router.delete("/users/:id", protect, deleteUser);
router.put("/change-password", protect, updatePassword);
export default router;
