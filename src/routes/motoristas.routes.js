import { Router } from "express"
import { motoristasController } from "../bootstrap.js"

const router = Router()

router.get("/", motoristasController.listarTodos)
router.get("/:id", motoristasController.buscarPorId)
router.post("/", motoristasController.criar)
//router.get("/:id/entregas")
//router.patch("/:id/atribuir")

export default router
