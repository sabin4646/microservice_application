import { validationResult } from "express-validator";
import ApiResponse from "../../../utils/api.response.mjs";
import AppStatusCode from "../../../utils/app.statuscode.mjs";
import asyncHandler from "../../../utils/async.handler.mjs";
import Blog from "../model/blog.model.js";
import ErrorResponse from "../../../utils/error.response.mjs";

const createABlogPost = asyncHandler(async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }

    const { content, title } = req.body;
    await Blog.create({ content, author: req._id, title, });
    res
        .status(AppStatusCode.created)
        .json(
            new ApiResponse(
                AppStatusCode.created,
                `Successfully created a blog post`
            )
        )

});


const blogById = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Validation Error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ErrorResponse(
            AppStatusCode.notFound,
            `Blog with id ${blogId} not found`
        )
    }
    res
        .status(AppStatusCode.ok)
        .json(
            new ApiResponse(
                AppStatusCode.ok,
                `Successfully retrived blog with ${blogId}`,
                blog,
            )
        )
});


const allBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    res
        .status(AppStatusCode.ok)
        .json(
            new ApiResponse(
                AppStatusCode.ok,
                `Successfully got all blogs`,
                blogs,
            )
        )
})

const deleteABlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.blogId);
    res
        .status(AppStatusCode.ok)
        .json(
            new ApiResponse(
                AppStatusCode.ok,
                `Successfully deleted a blog post whose id is ${req.params.blogId}`
            )
        )
});

const updateABlog = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Validation Error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const { content, title } = req.body;
    await Blog.findByIdAndUpdate(req.params.blogId, {
        $set: {
            content,
            title,
        }
    });
    res
        .status(AppStatusCode.ok)
        .json(
            new ApiResponse(
                AppStatusCode.ok,
                `Successfully updated a blog`,
                null,
            )
        )

});


export {
    createABlogPost,
    blogById,
    allBlogs,
    deleteABlog,
    updateABlog,
}