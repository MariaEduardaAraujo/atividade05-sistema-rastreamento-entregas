import { Router } from "express"
import { relatoriosController } from "../bootstrap/bootstrap.js"
import { autorizarMiddleware } from "../middlewares/autorizacao.middleware.js"
import { autenticarMiddleware } from "../middlewares/autenticacao.middleware.js"

const router = Router()

router.get("/entregas-por-status", autenticarMiddleware, autorizarMiddleware("GESTOR"), relatoriosController.entregaPorStatus)
router.get("/motoristas-ativos", autenticarMiddleware, autorizarMiddleware("GESTOR"), relatoriosController.motoristasAtivos)

export default router
