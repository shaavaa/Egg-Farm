import express from "express"
import { verifyToken } from "../middleware/authorization"
import { createPack, dropPack, getPacks, updatePack } from "../controller/packController"
import { verifyAddPack, verifyEditPack } from "../middleware/verifyPack"

const app = express()

app.use(express.json())

app.get(`/pack`, [verifyToken], getPacks)
app.post(`/pack`, [verifyToken, verifyAddPack], createPack)
app.put(`/pack/:id`, [verifyToken, verifyEditPack], updatePack)
app.delete(`/pack/:id`, [verifyToken], dropPack)

export default app