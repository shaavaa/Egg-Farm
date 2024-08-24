import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { it } from "node:test";

const addDataSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
})

const updateDataSchema = Joi.object({
    name: Joi.string().optional(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
})

const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

export const verifyAddAdmin = (request: Request, response: Response, next: NextFunction) => {
    const {error} = addDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it=> it.message).join()
        })
    }
    return next()
}

export const verifyEditAdmin = (request: Request, response: Response, next: NextFunction) => {
    const {error} = updateDataSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it=> it.message).join()
        })
    }
    return next()
}

export const verifyAuthentication = (request: Request, response: Response, next: NextFunction) => {
    const {error} = authSchema.validate(request.body, {abortEarly: false})

    if (error) {
        return response
        .status(400)
        .json({
            status: false,
            message: error.details.map(it=> it.message).join()
        })
    }
    return next()
}