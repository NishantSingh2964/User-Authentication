import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () =>
            console.log("Database connected")
        );

        await mongoose.connect(`${process.env.MONGODB_URI}/Authentication`);

    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1); 
    }
};

export default connectDB;