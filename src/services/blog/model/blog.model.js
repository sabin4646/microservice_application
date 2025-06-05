import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
);




const Blog = mongoose.model("Blog", blogSchema);

export default Blog;