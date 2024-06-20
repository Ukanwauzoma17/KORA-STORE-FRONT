import { ApiResponse } from '../../Utils/api-response';
import { Request,Response } from "express";
import ErrorResponse from "../../Utils/error-response";
import Stores from "../model/store-front-model";
import { createStoreFront } from "../validator/create-storefront-validator";
import { generateStoreId } from '../../Utils/generate-store-id';

export const createStore= async (req:Request,res:Response):Promise<void>=>{
const validation= createStoreFront(req.body)
if (validation.error) {
    ErrorResponse.send(res, { error: validation.error.details[0].message });
    return;
  }
  const userId= req.admin?.id
  const{storeName}=validation.value
  const url= process.env.STORE_LINK_URL
if(!userId){
    ErrorResponse.send(res, {message:"User not found"});
    return
}
const userStore=await Stores.findOne({
  where:{storeName:storeName}
})
if(userStore){
  ErrorResponse.send(res, {message:"Store Name Taken"});
}
const storeId=generateStoreId()
const storeLink=`${url}${storeName}`
 const store= await Stores.create({
    storeName,
    userId,
    storeId
  })
  await store.save();
  res.json(ApiResponse.formatSuccessResponse({ message: "Store created",data: { ...{ storeName: store.storeName },storeLink } }));

}

export const deleteStore = async (req: Request, res: Response): Promise<void> => {
  const userId = req.admin?.id;

  if (!userId) {
    ErrorResponse.send(res, { message: "User not found" });
    return;
  }
    const store = await Stores.findOne({
      where: {
        userId: userId,
      },
    });

    if (!store) {
      ErrorResponse.send(res, { message: "Store not found" });
      return;
    }

    await store.destroy();

    res.json(ApiResponse.formatSuccessResponse({ message: "Store deleted" }));
  } 