import { Router } from "express";

import {getProducts,addProduct} from '../controller/productController.js';
import verifyToken from "../middleware/verifyToken.js";


const routes = Router();

routes.get('/', getProducts);
routes.post('/addproduct',verifyToken,addProduct);
routes.delete('/deleteProduct',getProducts);


export default routes;