import Joi from "joi";
const createStore= Joi.object({
   storeName:Joi.string().required()
});
 export function createStoreFront(data:any){
    return createStore.validate(data);
 };