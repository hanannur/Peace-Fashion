import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';
import env from './config/env';
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import { errorHandler } from "./middleware/error.Middleware";

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend
  credentials: true // Allow cookies (Crucial for your JWT login later)
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 
app.use(errorHandler); 


app.get('/', (req, res) => {
  res.send('Backend is running');
});


connectDB();


app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
