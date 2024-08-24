import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getPacks = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const allPacks = await prisma.packs.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response
            .json({
                status: true,
                data: allPacks,
                message: `Pack has retrieved`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const createPack = async (request: Request, response: Response) => {
    try {
        const { name, price, capacity } = request.body

        const newPack = await prisma.packs.create({
            data: {
                name, price: Number(price), capacity: Number(capacity)
            }
        })

        return response
            .json({
                status: true,
                data: newPack,
                message: `New pack has created`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const updatePack = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { name, price, capacity } = request.body

        const findPack = await prisma.packs.findFirst({
            where: { id: Number(id) }
        })

        if (!findPack)
            return response
                .status(200)
                .json({
                    status: false,
                    message: `Pack is not found`
                })

        const updatePack = await prisma.packs.update({
            where: { id: Number(id) },
            data: {
                name: name || findPack.name,
                price: price || findPack.price,
                capacity: capacity || findPack.capacity
            }
        })

        return response
            .json({
                status: true,
                data: updatePack,
                message: `Pack has been update`
            })
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const dropPack = async (request: Request, response: Response) => {
    try {
        const { id } = request.params

        const findPack = await prisma.packs.findFirst({
            where: { id: Number(id) }
        })

        if (!findPack)
            return response
                .status(200)
                .json({
                    status: false,
                    message: `Pack is not found`
                })

        const deletePack = await prisma.packs.delete({
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: deletePack,
            message: `Pack has deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}