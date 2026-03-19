import { Router } from "express"
import { EntregasRepository } from "../repositories/entregas.repositories.js"
import { EntregasService } from "../services/entregas.service.js"
import { EntregasController } from "../controller/entregas.controller.js"

const repository = new EntregasRepository()
const service = new EntregasService(repository)
const controller = new EntregasController(service)

const router = Router()

router.get("/", controller.listarTodos)
router.get("/:id", controller.buscarPorId)
router.post("/", controller.criar)

export default router