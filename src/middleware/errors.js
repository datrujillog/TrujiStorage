


class GeneralError extends Error {
    constructor(message, code) {
        super();
        this.message = message;
        this.code = code;
    }

    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        } if (this instanceof NotFound) {
            return 404;
        } if (this instanceof Unauthorized) {
            return 401;
        } if (this instanceof Forbidden) {
            return 403;
        } if (this instanceof Conflict) {
            return 409;
        } if (this instanceof InternalServerError) {
            return 500;
        }
        return 500;
    }
}

class BadRequest extends GeneralError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

class NotFound extends GeneralError {
    constructor(message = 'Not found') {
        super(message, 404);
    }
}

class Unauthorized extends GeneralError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}
class Forbidden extends GeneralError {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}

class Conflict extends GeneralError {
    constructor(message = 'Conflict') {
        super(message, 409);
    }
}

class InternalServerError extends GeneralError {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
    }
}

export {
    GeneralError,
    BadRequest,
    NotFound,
    Unauthorized,
    Forbidden,
    Conflict,
    InternalServerError
}