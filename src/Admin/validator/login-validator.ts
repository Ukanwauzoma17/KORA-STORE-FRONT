import Joi from "joi";
const loginByMailSchema= Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
 export  function loginInfo(data:any){
    return loginByMailSchema.validate(data);
 };