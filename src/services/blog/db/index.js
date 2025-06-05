import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connected to Blog Database");
    } catch (error) {
        console.log(`An error occured while connecting to database`);
    }
}

export default connectDb;