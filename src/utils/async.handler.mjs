import AppStatusCode from "./app.statuscode.mjs";
import ErrorResponse from "./error.response.mjs";

const asyncHandler = (callbackfunction) => async (req, res, next) => {
    try {
        await callbackfunction(req, res, next);

    } catch (error) {
        res
            .status(
                error.statusCode || AppStatusCode.internalServerError)
            .json(
                new ErrorResponse(
                    error.statusCode || AppStatusCode.internalServerError,
                    error.message || "Internal server error",
                    error.errors || null,
                )
            );
    }
}

export default asyncHandler;