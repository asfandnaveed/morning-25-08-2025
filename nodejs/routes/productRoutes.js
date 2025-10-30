import { Router } from "express";

import {getProducts} from '../controller/productController.js';


const routes = Router();

routes.get('/', getProducts);
routes.post('/addproduct',getProducts);
routes.delete('/deleteProduct',getProducts);


export default routes;