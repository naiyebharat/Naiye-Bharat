import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole = "client" | "advocate" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
  otp?: string;
  otpExpiry?: Date;
  deleteAt?: Date; // TTL index — 10 min baad auto delete
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },
    role: {
      type: String,
      enum: ["client", "advocate", "admin"],
      default: "client",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    // OTP fields
    otp: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    // TTL field — MongoDB isko 10 min baad automatically delete karega
    // Jab user verify ho jaye toh ise undefined kar do (permanent ban jayega)
    deleteAt: {
      type: Date,
      expires: 0, // deleteAt ki value pe exactly expire karo
      default: undefined,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;