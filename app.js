import express from "express"
import entregasRouter from "./router/entregas.routes.js"

const app = express()
app.use(express.json())

app.use("/entregas", entregasRouter)

export default app