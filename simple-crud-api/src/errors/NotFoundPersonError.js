class NotFoundPersonError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "NotFoundPersonError";
        this.statusCode =  statusCode;
    }
}

module.exports = NotFoundPersonError;