class ErrorResponse {
    constructor(statusCode, message, errors, success = false) {
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = success;
    }
}

export default ErrorResponse;