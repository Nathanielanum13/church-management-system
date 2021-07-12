export class Response {
    constructor(message, code, id) {
        this.message = message
        this.code = code
        this.id = id
    }
}
export const httpStatusCode = {
    "SUCCESS": 200 || 201,
    "ERROR": 400,
    "INFO": 100,
    "NOT_FOUND": 404
}