import { Router } from "express"
import { entregasController } from "../bootstrap.js"

const router = Router()

router.get("/", entregasController.listarTodos)
router.get("/:id", entregasController.buscarPorId)
router.post("/", entregasController.criar)
router.patch("/:id/avancar", entregasController.avancar)
router.patch("/:id/cancelar", entregasController.cancelar)
router.get("/:id/historico", entregasController.historico)

export default router
