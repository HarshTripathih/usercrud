import Joi from "joi";


export const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        firstName: Joi.string().required(),
        lastName : Joi.string().required(),
        age: Joi.number().required(),
        phoneNo: Joi.number().required(),
        address: Joi.string().optional(),
    });
    return schema.validate(data);
}

export const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
}

export const userInfoValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        age: Joi.number().min(0),
        phoneNo: Joi.number().optional(),
        address: Joi.string().optional(),
    });
    return schema.validate(data);
}
