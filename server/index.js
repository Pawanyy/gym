import "dotenv/config";
import app from "./app.js";
import logger from './logger.js';
import Database from "./config/Database.js";
import appConfig from "./config/config.js"

const PORT = appConfig.port;

const startServer = async () => {
    try {
        app.listen(PORT, async () => {
            logger.info(`Server started successfully on PORT: ${PORT}`);
            await new Database(appConfig.db).connect();
        });
    } catch (err) {
        logger.error(`Error starting server: ${err.message}`);
    }
};

startServer();