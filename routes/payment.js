import { Router } from "express";
import paymentController from "../controllers/payment.js";
import validate from "../middlewares/valdation.js";
import validationSchema from "../validations/payment.js"


const paymentRouter=Router()



paymentRouter.post('/add',validate(validationSchema.addpayment),paymentController.initiatePayment);

// paymentRouter.get('/',paymentController.getpayments)
paymentRouter.get('/verify',paymentController.completepayment);

export default paymentRouter