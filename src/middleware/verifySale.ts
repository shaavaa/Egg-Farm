import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { join } from "path";

const saleDetailSchema = Joi.object({
    egg_id: Joi.number().required(),
    egg_price: Joi.number().required(),
    egg_qty: Joi.number().required(),
    pack_id: Joi.number().required(),
    pack_price: Joi.number().required(),
    pack_qty: Joi.number().required(),
})

const addDataSchema = Joi.object({
    sale_date: Joi.string().optional(),
    customer_name: Joi.string().optional(),
    customer_address: Joi.string().optional(),
    customer_phone: Joi.string().optional(),
    sale_details: Joi.array().items(saleDetailSchema).min(1).required()
})

export const verifyAddSale = (request: Request, response: Response, next: NextFunction) => {
    const {error} = addDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it => it.message).join()
        })
    }
    return next()
}