import { Router } from "express";

import {getProducts,addProduct , getProductById} from '../controller/productController.js';
import verifyToken from "../middleware/verifyToken.js";


const routes = Router();

routes.get('/', getProducts);
routes.get('/:id', getProductById);
routes.post('/addproduct',verifyToken,addProduct);
routes.post('/editproduct',verifyToken,addProduct);
routes.delete('/deleteProduct',getProducts);


export default routes;