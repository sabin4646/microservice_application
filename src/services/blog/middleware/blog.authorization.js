import { validationResult } from "express-validator";
import asyncHandler from "../../../utils/async.handler.mjs";
import ErrorResponse from "../../../utils/error.response.mjs";
import AppStatusCode from "../../../utils/app.statuscode.mjs";
import Blog from "../model/blog.model.js";
import mongoose from "mongoose";

const blogAuthorization = asyncHandler(async (req, res, next) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Blog post with ${req.params.blogId} doesnot exists`
        )
    }
    if (!new mongoose.Types.ObjectId(req._id).equals(blog.author)) {
        throw new ErrorResponse(
            AppStatusCode.forbidden,
            `You are forbidden to perform ${req.method} action!`
        )   
    }
    next();

})

export default blogAuthorization;