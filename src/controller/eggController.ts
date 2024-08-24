import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs"
import { BASE_URL } from "../global";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllEgs = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const allEgs = await prisma.eggs.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response
            .json({
                status: true,
                data: allEgs,
                message: `Eggs has retrieved`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const createEgg = async (request: Request, response: Response) => {
    try {
        const { name, price, stock } = request.body

        let filename = ""
        if (request.file) filename = request.file.filename

        const newEgg = await prisma.eggs.create({
            data: {
                name, price: Number(price), stock: Number(stock), image: filename
            }
        })

        return response
            .json({
                status: true,
                data: newEgg,
                message: `New egg has been created`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const updateEgg = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { name, price, stock } = request.body

        const findEgg = await prisma.eggs.findFirst({
            where: { id: Number(id) }
        })

        if (!findEgg)
            return response
                .status(200)
                .json({
                    status: false,
                    message: `Egg is not found`
                })

        let filename = findEgg.image
        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/../public/egg-image/${findEgg.image}`
            let exists = fs.existsSync(path)
            if (exists && findEgg.image !== ``) fs.unlinkSync(path)
        }

        const updateEgg = await prisma.eggs.update({
            data: {
                name: name || findEgg.name,
                price: price || findEgg.price,
                stock: stock || findEgg.stock,
                image: filename
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updateEgg,
            message: `Egg has updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const dropEgg = async (request: Request, response: Response) => {
    try {
        const { id } = request.params

        const findEgg = await prisma.eggs.findFirst({
            where: { id: Number(id) }
        })

        if (!findEgg)
            return response
                .status(200)
                .json({
                    status: false,
                    message: `Egg is not found`
                })

        let path = `${BASE_URL}/public/egg-image/${findEgg.image}`
        let exists = fs.existsSync(path)
        if(exists && findEgg.image !==``) fs.unlinkSync(path)

        const deleteEgg = await prisma.eggs.delete({
            where: {id: Number(id)}
        })
        return response.json({
            status: true,
            data: deleteEgg,
            message: `Egg has deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}