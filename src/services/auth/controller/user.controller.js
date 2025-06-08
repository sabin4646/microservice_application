import { validationResult } from "express-validator";
import AppStatusCode from "../../../utils/app.statuscode.mjs";
import asyncHandler from "../../../utils/async.handler.mjs";
import ErrorResponse from "../../../utils/error.response.mjs";
import User from "../model/user.model.js";
import ApiResponse from "../../../utils/api.response.mjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../producer/email/email.producer.js";
import { sendNotification } from "../producer/notification/notification.producer.js";

const register = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Validation error: ${result.array()[0].msg}`,
            result.array(),
        )
    }
    const { email, password, gender } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ErrorResponse(
            AppStatusCode.conflict,
            `User with ${email} already exists choose another email`
        )
    }
    await User.create({
        email,
        password,
        gender,
    });

    res
        .status(AppStatusCode.created)
        .json(
            new ApiResponse(
                AppStatusCode.created,
                `Account created`,
                null,
            )
        )
    sendMail({
        from: "company@gmail.com",
        to: email,
        message: `Hello ${email}. Thanks for the registration`
    });
});

const login = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Validation error ${result.array().at(0).msg}`,
            result.array(),
        )
    };
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new ErrorResponse(
            AppStatusCode.notFound,
            `User with ${email} doesnot exists`
        );
    }
    const user = await User.findOne({ email, password });
    if (!user) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Incorrect password entered`,
        )
    }
    const jwtToken = jwt.sign({
        "email": user.email,
        "_id": user._id,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
    const data = {
        ...user._doc,
        "jwtToken": jwtToken,
    }
    res
        .status(
            AppStatusCode.ok
        ).json(
            new ApiResponse(
                AppStatusCode.ok,
                `Login successfull`,
                data,
            )
        );
    sendNotification({ message: `Your account ${email} was logged in just now.` });
});

const userById = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ErrorResponse(
            AppStatusCode.badRequest,
            `Validation error: ${result.array().at(0).msg}`,
            result.array(),
        )
    }
    const user = await User.findById(req.params.userId);

    res
        .status(AppStatusCode.ok)
        .json(
            new ApiResponse(
                AppStatusCode.ok,
                `Successfully got user's detail`,
                user,
            )
        )

});

export {
    register,
    login,
    userById,
}