import { Router } from "express"
import { entregasController } from "../bootstrap/bootstrap.js"
import { autorizarMiddleware } from "../middlewares/autorizacao.middleware.js"
import { autenticarMiddleware } from "../middlewares/autenticacao.middleware.js"

const router = Router()

router.get("/", autenticarMiddleware, entregasController.listarTodos)
router.get("/:id", autenticarMiddleware, entregasController.buscarPorId)
router.post("/", autenticarMiddleware, entregasController.criar)
router.patch("/:id/avancar", autenticarMiddleware, entregasController.avancar)
router.patch("/:id/cancelar", autenticarMiddleware, autorizarMiddleware("GESTOR"), entregasController.cancelar)
router.get("/:id/historico", autenticarMiddleware, entregasController.historico)
router.patch("/:id/atribuir", autenticarMiddleware, entregasController.atribuir)

export default router
