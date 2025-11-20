import { Router } from "express";
import { createPayment } from "../controller/paymentController.js";


const routes = Router();

routes.post('/create-payment', createPayment);

export default routes;