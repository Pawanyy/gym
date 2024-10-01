import logger from "../logger.js";

const errorHandler = (err, req, res, next) => {

    if (err) {
        logger.error(`Error in Server: ${err}`);
        console.error("Error Middleware: ", err);
    }

    // Handle MongoDB duplicate key error (E11000)
    if (err.name === 'MongoServerError' && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0]; // Extract the field causing the error
        return res.status(409).json({
            status: 'error',
            statusCode: 409,
            error: 'Duplicate Key Error',
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
            field: err.keyValue // Include the conflicting value for client context
        });
    }

    // Handle different types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            statusCode: 400,
            error: 'Validation Error',
            message: err.message
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            statusCode: 400,
            error: 'Invalid Data Format',
            message: `Invalid value for ${err.path}`
        });
    }

    if (err.code === 'ECONNREFUSED') { // Connection Refused Error
        return res.status(503).json({
            status: 'error',
            statusCode: 503,
            error: 'Service Unavailable',
            message: 'Could not connect to the service'
        });
    }

    // Default error handler
    res.status(500).json({
        status: 'error',
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Something went wrong!',
        stackTrace: err.stack
    });
}

export default errorHandler;