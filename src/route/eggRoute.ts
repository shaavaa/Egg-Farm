import express from "express"
import { verifyToken } from "../middleware/authorization"
import { createEgg, dropEgg, getAllEgs, updateEgg } from "../controller/eggController"
import { uploadFile } from "../middleware/uploadImageOfEgg"
import { verifyAddEgg, verifyEditEgg } from "../middleware/verifyEgg"

const app = express()

app.use(express.json())

app.get(`/egg`, [verifyToken], getAllEgs)
app.post(`/egg`, [verifyToken, uploadFile.single("image"), verifyAddEgg], createEgg)
app.put(`/egg/:id`, [verifyToken, uploadFile.single("image"), verifyEditEgg], updateEgg)
app.delete(`/egg/:id`, [verifyToken], dropEgg)

export default app