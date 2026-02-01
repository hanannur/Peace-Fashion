// backend/src/middleware/upload.ts
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import env from "../config/env";
import { v2 as cloudinary } from "cloudinary";

// We define the interface for the Cloudinary params for TypeScript
interface CloudinaryParams {
  folder: string;
  allowed_formats: string[];
  transformation?: Array<{ [key: string]: any }>;
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gentcollect_products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  } as CloudinaryParams, // 🟢 Tells TS exactly what these params are
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

export default upload;