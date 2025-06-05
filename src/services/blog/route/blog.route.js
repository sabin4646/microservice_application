import { Router } from "express";
import auth from "../middleware/auth.js";
import { body, param } from "express-validator";
import { allBlogs, blogById, createABlogPost, deleteABlog, updateABlog } from "../controller/blog.controller.js";
import mongoose, { mongo, Mongoose } from "mongoose";
import blogAuthorization from "../middleware/blog.authorization.js";

const blogRouter = Router();

blogRouter.post(
    "/create",
    auth,
    body("title").notEmpty().withMessage("Blog title field cannot be empty"),
    body("content").notEmpty().withMessage("Content field cannot be empty"),
    createABlogPost,
);


blogRouter.get(
    "/all",
    allBlogs,
)


blogRouter.get(
    "/:blogId",
    param("blogId").custom((blogId) => {
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            throw new Error("Invalid blog id");
        }
        return true;
    }),
    blogById,
);

blogRouter.delete(
    "/:blogId",
    auth,
    param("blogId").custom((blogId) => {
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            throw Error(`Invalid blog id`);
        }
        return true;
    }),
    blogAuthorization,
    deleteABlog,
)

blogRouter.patch(
    "/:blogId",
    auth,
    param("blogId").custom((blogId) => {
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            throw new Error("Invalid blog id");
        }
        return true;
    }),
    blogAuthorization,
    updateABlog,

)


export default blogRouter;