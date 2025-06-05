import jwt from "jsonwebtoken";
import ErrorResponse from "../../../utils/error.response.mjs";
import AppStatusCode from "../../../utils/app.statuscode.mjs";
import asyncHandler from "../../../utils/async.handler.mjs";

const auth = asyncHandler((req, res, next) => {
    const { authtoken } = req.headers;
    if (!authtoken) {
        throw new ErrorResponse(
            AppStatusCode.unauthorized,
            `Missing auth token. Please login to continue`
        )
    }
    try {
        const decodedData = jwt.verify(authtoken, process.env.JWT_SECRET);
        req.email = decodedData.email;
        req._id = decodedData._id;
        next();
    } catch (error) {
        throw new ErrorResponse(
            AppStatusCode.unauthorized,
            error.message,
        )
    }

})

export default auth;