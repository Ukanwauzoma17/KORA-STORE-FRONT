import { findUserProduct } from './../service/product-service';

import { findByUserId } from './../../Admin/auth/service/admin-service';
import { Request, Response } from 'express';
import { generateProductId } from '../../Utils/generate-product-id';
import Products from '../model/product-model';
import { validateProduct } from '../validator/product-validator';



export const createProduct= async(req:Request,res:Response):Promise<void>=>{
    const validation = validateProduct(req.body);
    const userId = req.admin?.id;
    if (validation.error) {
      res.status(400).json({ error: validation.error.details[0].message });
      return;
    }
    const { productName,description,quantity,price}= validation.value
    if (!userId) {
         res.status(400).send({
          error: "User ID not found",
          success: false,
          message: "User ID not found",
        });
        return
      }
      const user = await findByUserId(userId);
    if (user) {
        const productId=generateProductId()
        const newProduct = await Products.create({
            userId,
            productId,
            productName,
            description,
            quantity,
            price,
            count:0
          });
          const userProduct= await findUserProduct(productId)
          if(userProduct){
            if (userProduct.count===15){
              res.status(400).send("sorry youre unable to add a new product")
            }else{
            userProduct.count += 1;
            await userProduct.save();
            }
          }
  res.status(200).json({ message: 'Product created successfully', ...newProduct })
    }
    
}



