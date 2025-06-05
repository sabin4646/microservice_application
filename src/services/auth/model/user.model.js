import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"]
    }
});

const User = mongoose.model("USER", userSchema);

export default User;


