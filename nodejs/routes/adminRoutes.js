import { Router } from "express";
import { adminLogin } from "../controller/adminController.js";



const routes = Router();

routes.post('/admin-login' , adminLogin);

export default routes;