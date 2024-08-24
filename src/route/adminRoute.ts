import express from "express"
import { verifyToken } from "../middleware/authorization"
import { authentication, createAdmin, dropAdmin, getAdmin, updateAdmin } from "../controller/adminController"
import { verifyAddAdmin, verifyAuthentication, verifyEditAdmin } from "../middleware/verifyAdmin"

const app = express()

app.use(express.json)

app.get(`/admin`, [verifyToken], getAdmin)
app.post(`/admin`, [verifyToken, verifyAddAdmin], createAdmin)
app.put(`/admin/:id`, [verifyToken, verifyEditAdmin], updateAdmin)
app.delete(`/admin/:id`, [verifyToken], dropAdmin)
app.post(`/auth`, [verifyAuthentication], authentication)

export default app