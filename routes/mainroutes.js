import { Router } from "express";

import subscriptionPlanRouter from "./subscriptionPlan.js";
import paymentRouter from "./payment.js";


const mainRouter=Router();


mainRouter.use('/subscriptionPlan',subscriptionPlanRouter);
mainRouter.use('/payment',paymentRouter)

export default mainRouter;