class InvalidDataInRequestError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = "InvalidDataInRequestError";
        this.statusCode =  statusCode;
    }
}

module.exports = InvalidDataInRequestError;