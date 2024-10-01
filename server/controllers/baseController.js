import ApiError from '../utils/ApiError.js';

export default class BaseController {
    constructor() {
    }

    respondSuccess(data = {}, message = 'Operation successful', statusCode = 200) {
        return {
            status: 'success',
            statusCode,
            message,
            data,
            timestamp: new Date().toISOString()
        };
    }

    respondError(message = 'An error occurred', statusCode = 500, errors = []) {
        return {
            status: 'error',
            statusCode,
            message,
            errors: errors.length ? errors : undefined,
            timestamp: new Date().toISOString()
        };
    }

    handleValidationError(error) {
        const errors = error.details?.map((err) => err.message) || [];
        console.log(error)
        return this.respondError('Validation error', 400, errors);
    }

    handleError(error, defaultMessage = 'Internal Server Error') {
        if (error instanceof ApiError) {
            return this.respondError(error.message, error.statusCode);
        }
        return this.respondError(defaultMessage, 500);
    }
}
