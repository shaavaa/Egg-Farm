import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { join } from "path";

const addDataSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    image: Joi.allow().optional()
})

const updateDataSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    stock: Joi.number().optional(),
    image: Joi.allow().optional(),
})

export const verifyAddEgg = (request: Request, response: Response, next: NextFunction) => {
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

export const verifyEditEgg = (request: Request, response: Response, next: NextFunction) => {
    const {error} = updateDataSchema.validate(request.body, {abortEarly: false})

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