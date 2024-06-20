import Joi from "joi";
const verifymMailSchema= Joi.object({
   email: Joi.string().email().required(),
});
 export  function verifyMailSchema(data:any){
    return verifymMailSchema.validate(data);
 };