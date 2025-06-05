import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connected to Auth Database");
    } catch (error) {
        console.log(`Falied to connect with mongodb ${error}`);
        process.exit(1);
    }
}

export default connectDb;