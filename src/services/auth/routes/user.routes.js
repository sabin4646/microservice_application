import { Router } from "express";
import { login, register, userById } from "../controller/user.controller.js";
import { body, param } from "express-validator";
import mongoose from "mongoose";

const userRouter = Router();


userRouter.post(
    "/register",
    body("email").notEmpty().withMessage("Email field is required"),
    body("email").isEmail().withMessage("Enter a valid email id"),
    body("password").notEmpty().withMessage("Password is required"),
    body("gender").isIn(["MALE", "FEMALE", "OTHERS"]).withMessage("Gender has to be MALE, FEMALE, OTHERS"),
    register,
);

userRouter.post(
    "/login",
    body("email").notEmpty().withMessage("Email field is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password field is required"),
    login,
);

userRouter.get(
    "/:userId",
    param("userId").custom((userId) => {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user id");
        }
        return true;
    }),
    userById,
)


export default userRouter;