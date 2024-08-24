import express from "express"
import { verifyToken } from "../middleware/authorization"
import { createSale, dropSale, getAllSales } from "../controller/saleController"
import { verifyAddSale } from "../middleware/verifySale"

const app = express()

app.use(express.json())

app.get(`/order`, [verifyToken], getAllSales)
app.post(`/order`, [verifyToken, verifyAddSale], createSale)
app.delete(`/order/:id`, [verifyToken], dropSale)

export default app