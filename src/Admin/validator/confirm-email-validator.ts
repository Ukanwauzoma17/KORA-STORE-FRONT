import Joi from "joi";
const confirmMailSchema= Joi.object({
    token: Joi.string().required()
});
 export  function confirmMailInfo(data:any){
    return confirmMailSchema.validate(data);
 };