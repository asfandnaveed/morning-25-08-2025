import { Router } from "express";
import { registerUser, userLogin } from "../controller/userController.js";



const routes = Router();

routes.post('/user-login' , userLogin);
routes.post('/user-register' , registerUser);

export default routes;