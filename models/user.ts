import mongoose, { Schema, Document } from "mongoose";

// Define the user interface
interface IUser extends Document {
    fname: string;
    lname: string;
    username: string;
    password: string; // Corrected to "password"
    role?: string;
}

// Create the user schema
const userSchema = new Schema<IUser>(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true, 
        },
        password: { 
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: false,
            default: "user",
        },
    },
    { timestamps: true }
);

// Create and export the user model
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
