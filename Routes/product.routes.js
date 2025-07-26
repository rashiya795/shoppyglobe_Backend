import express from 'express'
  import {  getAllProducts, getProductById } from "../Controllers/product.controllers.js"
  

  const router = express.Router();



// Get all products
 router.get('/',getAllProducts);

 //get product by product id
 router.get('/:id',getProductById)

export default router; 
