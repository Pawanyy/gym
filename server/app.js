import express from "express";
import morgan from "morgan";
import appRoutes from "./routes/index.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import appConfig from "./config/config.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(appConfig.corsOptions))

app.use(morgan("dev"))

app.use(appConfig.apiPrefix, appRoutes);

app.use(errorHandler);

app.use(notFoundHandler);

export default app;