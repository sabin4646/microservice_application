class AppStatusCode {
    static #ok = 200;
    static #created = 201;
    static #badRequest = 400;
    static #unauthorized = 401;
    static #forbidden = 403;
    static #notFound = 404;
    static #internalServerError = 500;
    static #conflict = 409;


    static get ok() {
        return this.#ok;
    }

    static get created() {
        return this.#created;
    }

    static get badRequest() {
        return this.#badRequest;
    }

    static get unauthorized() {
        return this.#unauthorized;
    }

    static get forbidden() {
        return this.#forbidden;
    }

    static get notFound() {
        return this.#notFound;
    }

    static get internalServerError() {
        return this.#internalServerError;
    }

    static get conflict() {
        return this.#conflict;
    }

}

export default AppStatusCode;