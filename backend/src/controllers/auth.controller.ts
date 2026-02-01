import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { HydratedDocument } from "mongoose";
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
// export const updateProfile = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?.id || req.user?._id;

//     if (!userId) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (req.body.name) user.name = req.body.name;

//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(req.body.password, salt);
//     }

//     if (req.file) {
//       // req.file.filename comes from Multer middleware
//       user.avatar = `/uploads/${req.file.filename}`; 
//     }

//     await user.save();
    
//     const userResponse = user.toObject();
//     delete (userResponse as any).password;
    
//     return res.json(userResponse);
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message || "Internal Server Error" });
//   }
// };



// export const updateProfile = async (req: any, res: Response) => {
//   try {
//     const userId = req.user?.id || req.user?._id;

//     if (!userId) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     // 🟢 Explicitly type as HydratedDocument to fix the .save() error
//     const user: HydratedDocument<IUser> | null = await User.findById(userId);
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update name if provided
//     if (req.body.name) user.name = req.body.name;

//     // 🟢 Simply assign the password; your Model's pre-save hook hashes it
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     // Update avatar if a file was uploaded via Multer
//     if (req.file) {
//       user.avatar = `/uploads/${req.file.filename}`; 
//     }

//     // 🟢 .save() is now recognized as a callable function
//     await user.save();
    
//     // Clean up the response object
//     const userResponse = user.toObject();
//     delete (userResponse as any).password;
    
//     return res.json({
//       message: "Profile updated successfully",
//       user: userResponse
//     });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message || "Internal Server Error" });
//   }
// };
// backend/controllers/user.ts
// backend/controllers/auth.controller.ts

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = generateToken(user._id.toString(), user.role);

    // ✅ Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
    const user = await User.findOne({ email });
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

    // 5️⃣ Set HTTP-only cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false, // set true in production (HTTPS)
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
      res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true only in production
      sameSite: "lax", 
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
export const getProfile = async (req: any, res: any) => {
  try {
    // req.user.id comes from your protect middleware
    const user = await User.findById(req.user.id).select("-password"); 
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // This now sends name, email, role, etc.
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
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

