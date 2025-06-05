import { Router } from "express";
import { login, register } from "../controller/user.controller.js";
import { body } from "express-validator";

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


export default userRouter;