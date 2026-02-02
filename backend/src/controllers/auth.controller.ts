import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { HydratedDocument } from "mongoose";
import env from "../config/env";
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    _id?: string;
  };
  file?: any; // Using any here bypasses the Namespace error if types aren't linking
}


// backend/controllers/auth.controller.ts

export const updatePassword = async (req: any, res: any) => {
  try {
    // 🟢 Log this to see if the protect middleware is actually working
    console.log("User ID from request:", req.user?._id);

    const { newPassword } = req.body;
    const user = await User.findById(req.user?._id || req.user?.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.password) {
      user.password = req.body.password; // The Model hook will hash this
    }

    await user.save();
    res.status(200).json({ message: "Update successful", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    const token = generateToken(user._id.toString(), user.role);

    // ✅ Set HTTP-only cookie
//     res.cookie("token", token, {
//   httpOnly: true,
//   secure: true,      // MUST be true for Render (HTTPS)
//   sameSite: "none",  // MUST be "none" for cross-domain cookies
//   maxAge: 24 * 60 * 60 * 1000,
// });
// 🟢 This one line is your "bridge" between Local and Render
const isProd = env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  
  // 🟢 Works on Render (Secure) AND Localhost (Not Secure)
  secure: isProd, 
  
  // 🟢 Works for Vercel->Render (None) AND Localhost (Lax)
  sameSite: isProd ? "none" : "lax", 
  
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});

    // 5️⃣ Send response (no password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // 3️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Generate token
    const token = generateToken(user._id.toString(), user.role);
    const isProd = env.NODE_ENV === "production";

    // 5️⃣ Set HTTP-only cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false, // set true in production (HTTPS)
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
      res.cookie("token", token, {
      httpOnly: true,
      secure: isProd, // Set to true only in production
      sameSite: isProd ? "none" : "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
      // 6️⃣ Send user info
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
    secure: false, // true in production
  });
  res.status(200).json({ message: "Logged out successfully" });
};
// export const getProfile = async (req: any, res: any) => {
//   try {
//     // req.user.id comes from your protect middleware
//     const user = await User.findById(req.user.id).select("-password"); 
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user); // This now sends name, email, role, etc.
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching profile" });
//   }
// };

export const getProfile = async (req: any, res: any) => {
  try {
    // 🟢 Check if req.user exists (set by middleware)
    if (!req.user || !req.user.id) {
      return res.status(200).json(null); // Return 200 OK with null for guests
    }

    const user = await User.findById(req.user.id).select("-password"); 
    
    if (!user) {
      return res.status(200).json(null); 
    }

    res.status(200).json(user); 
  } catch (error) {
    // 🟢 Keep console clean even on server errors for this specific route
    res.status(200).json(null);
  }
};

// backend/controllers/auth.controller.ts
export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find().select("-password"); // Hide passwords!
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves accidentally
    if (id === req.user.id) {
      return res.status(400).json({ message: "You cannot delete your own admin account" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

