import mongoose from "mongoose";
import bcrypt from "bcrypt";
import env from "../config/env";
import User from "../models/User";

const createAdmin = async () => {
  try {
    await mongoose.connect(env.MONGO_URI!);
    console.log("Connected to MongoDB");

    const existingAdmin = await User.findOne({ email: "admin@test.com" });
    console.log("Existing admin:", existingAdmin);

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created:", admin);
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
