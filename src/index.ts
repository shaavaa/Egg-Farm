import express from "express"
import path from "path";
import cors from "cors"
import eggRoute from "./route/eggRoute"
import orderRoute from "./route/orderRoute"
import adminRoute from "./route/adminRoute"
import packRoute from "./route/packRoute"

const app = express()
const PORT : number = 8000

app.use(cors())

app.use(eggRoute)
app.use(orderRoute)
app.use(adminRoute)
app.use(packRoute)
app.use(`/public`, express.static(path.join(__dirname, `public`)))

app.listen(PORT, () => console.log(`Server egg farm run on PORT ${PORT}`))