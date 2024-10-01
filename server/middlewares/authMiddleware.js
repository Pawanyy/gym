import logger from '../logger.js'; // Assuming you have a logger utility
import { verifyToken } from '../utils/appUtils.js';

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Token is missing'
            });
        }

        try {
            const decoded = await verifyToken(token);
            req.user = decoded;

            if (roles.length > 0 && !roles.includes(decoded.role)) {
                return res.status(401).json({
                    status: 'error',
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'Access denied: insufficient permissions'
                });
            }

            logger.debug(`Authenticated User: ${JSON.stringify(decoded)}`);

            next();
        } catch (err) {
            logger.error(`Error in authMiddleware: ${err}`);
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                error: 'Unauthorized',
                message: err.message || "Invalid token",
            });
        }
    };
};

export default authMiddleware;
