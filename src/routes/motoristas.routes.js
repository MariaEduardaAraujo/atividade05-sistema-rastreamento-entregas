import { Router } from "express"
import { Database } from "../database/database.js"
import { MotoristasRepository } from "../repositories/motoristas.repository.js"
import { MotoristasService } from "../services/motoristas.service.js"
import { MotoristasController } from "../controllers/motoristas.controller.js"

const database = new Database()
const motoristasRepository = new MotoristasRepository(database)
const motoristasService = new MotoristasService(motoristasRepository)
const motoristasController = new MotoristasController(motoristasService)

const router = Router()

router.get("/", motoristasController.listarTodos)
router.get("/:id", motoristasController.buscarPorId)
router.post("/", motoristasController.criar)
router.get("/:id/entregas")
router.patch("/:id/atribuir")

export default router