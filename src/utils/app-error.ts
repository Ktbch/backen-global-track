export class AppErr extends Error {
    statusCode: number
    status: string
    isOperatoinal: boolean
    constructor (message: string, statusCode: number) {

        super(message)
        this.statusCode = statusCode
        this.status = `${ statusCode }`.startsWith('4') ? 'fail' : 'error'
        this.isOperatoinal = true
    }
}

const notFoundDefaultMessage = 'Not found'
export class NotFoundError extends AppErr {
    constructor (message = notFoundDefaultMessage) {
        super(message, 404)
    }
}
const badRequestDefaultMessage = 'Bad Request'
export class BadRequestError extends AppErr {
    constructor (message = badRequestDefaultMessage) {
        super(message, 400)
    }
}
const unAuthorizedDefaultMessage = 'UnAuthorized request'
export class UnAuthorisedRequestError extends AppErr {
    constructor (message = unAuthorizedDefaultMessage) {
        super(message, 401)
    }
}
const internalServerErrorDefaultMessage = 'An internal Server error occured'
export class InternalServerError extends AppErr {
    constructor (message = internalServerErrorDefaultMessage) {
        super(message, 500)
    }
}

