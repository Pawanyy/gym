import express from 'express';
import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import contactRoutes from "./contactRoutes.js";
import planRoutes from "./planRoutes.js";
import orderRoutes from "./orderRoutes.js";
import workoutRoutes from "./workoutRoutes.js"
import workoutPlanRoutes from "./workoutPlanRoutes.js";
import reportRoutes from "./reportRoutes.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter)

apiRouter.use("/users", userRouter)

apiRouter.use("/contacts", contactRoutes)

apiRouter.use("/plans", planRoutes)

apiRouter.use("/orders", orderRoutes)

apiRouter.use("/workouts", workoutRoutes)

apiRouter.use("/workoutPlans", workoutPlanRoutes)

apiRouter.use("/reports", reportRoutes)

export default apiRouter;
