import mongoose from 'mongoose';




export const connectMongoDB = async () => {
    try {
        const mongoDBUrl = process.env.MONGODB_URI;

        if (!mongoDBUrl) {
            throw new Error("MONGODB_URL is not defined");
        }

        await mongoose.connect(mongoDBUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};
