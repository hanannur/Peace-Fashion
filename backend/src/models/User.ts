// import mongoose, { Schema, Document } from "mongoose";
// import bcrypt from "bcrypt";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: "user" | "admin";
//   avatar?: string;
// }

// const UserSchema = new Schema<IUser>(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     avatar: {
//       type: String,
//     },    
//   },
//   { timestamps: true }
// );

// // Pre-save hook to hash password if modified
// UserSchema.pre<IUser>("save", async function (next) {
//   // Only hash if password is new or modified
//   if (!this.isModified("password")) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     // Use type assertion if 'password' is optional in interface
//     this.password = await bcrypt.hash(this.password as string, salt);
//     return next();
//   } catch (err: any) {
//     return next(err);
//   }
// });
// export default mongoose.model("User", UserSchema);



import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
    },    
  },
  { timestamps: true }
);

// Pre-save hook to hash password if modified
// 🟢 Remove (next) from the function arguments
UserSchema.pre<IUser>("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) return; 

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // 🟢 No need to call next() here
  } catch (err: any) {
    throw err; // Mongoose will catch this as a save error
  }
});
// 🟢 Correctly export the model with the IUser interface
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;