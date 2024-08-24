import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAdmin = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const allAdmin = await prisma.admin.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response
            .json({
                status: true,
                data: allAdmin,
                message: `Admin has retrieved`
            }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createAdmin = async (request: Request, response: Response) => {
    try {
        const { name, username, password } = request.body

        const newAdmin = await prisma.admin.create({
            data: {
                name, username, password: md5(password)
            }
        })

        return response
            .json({
                status: true,
                data: newAdmin,
                message: `Admin has been created`
            })
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const updateAdmin = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { name, username, password } = request.body

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        if (!findAdmin)
            return response
                .status(200)
                .json({
                    status: false,
                    message: `Admin not found`
                })

        const updateAdmin = await prisma.admin.update({
            where: {id: Number(id)},
            data: {
                name: name || findAdmin.name,
                username: username || findAdmin.username,
                password: password || findAdmin.password
            }
        })

        return response
        .json({
            status: true,
            data: updateAdmin,
            message: `Admin has updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            }).status(400)
    }
}

export const dropAdmin = async (request: Request, response: Response) => {
    try {
        const {id} = request.params

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) }
        })

        if (!findAdmin)
            return response
                .status(200)
                .json({
                    status: false,
                    message: `Admin not found`
                })
                
        const deleteAdmin = await prisma.admin.delete({
            where: {id: Number(id)}
        })

        return response
        .json({
            status: true,
            data: deleteAdmin,
            message: `Admin has been deleted`
        })
    } catch (error) {
        return response
        .json({
            status: false,
            message: `There is an error. ${error}`
        }).status(400)
    }
}

export const authentication = async (request: Request, response: Response) => {
    try {
        const {username, password} = request.body

        const findAdmin = await prisma.admin.findFirst({
            where: { username, password: md5(password) }
        })

        if (!findAdmin)
            return response
                .status(200)
                .json({
                    status: false,
                    logged: false,
                    message: `Username or password is invalid`
                })

                let payload = JSON.stringify(findAdmin)

                let secretKey = process.env.JWT_SECRET_KEY

                let token = sign(payload, secretKey || "darrel")

                return response
                .status(200)
                .json({
                    status: true,
                    logged: true,
                    message: `Login success`,
                    token
                })
    } catch (error) {
        return response
        .json({
            status: false,
            message: `There is an error. ${error}`
        }).status(400)
    }
}