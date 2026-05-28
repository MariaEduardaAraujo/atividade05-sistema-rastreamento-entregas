import { Router } from "express"
import { motoristasController } from "../bootstrap/bootstrap.js"
import { autorizarMiddleware } from "../middlewares/autorizacao.middleware.js"
import { autenticarMiddleware } from "../middlewares/autenticacao.middleware.js"

const router = Router()

router.get("/", autenticarMiddleware, motoristasController.listarTodos)
router.get("/:id", autenticarMiddleware, motoristasController.buscarPorId)
router.post("/", autenticarMiddleware, autorizarMiddleware("GESTOR"), motoristasController.criar)
router.get("/:id/entregas", autenticarMiddleware, motoristasController.listarEntregas)

export default router
