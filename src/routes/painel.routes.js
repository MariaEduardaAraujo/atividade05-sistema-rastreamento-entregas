import { Router } from "express"
import { painelEntregasController  } from "../bootstrap/bootstrap.js"
import { painelMotoristasController  } from "../bootstrap/bootstrap.js"
import { autorizarMiddleware } from "../middlewares/autorizacao.middleware.js"
import { autenticarMiddleware } from "../middlewares/autenticacao.middleware.js"

const router = Router()

router.get("/entregas", autenticarMiddleware, painelEntregasController.index)
router.get("/entregas/nova", autenticarMiddleware, painelEntregasController.nova)
router.post("/entregas", autenticarMiddleware, painelEntregasController.criar)
router.get("/entregas/:id", autenticarMiddleware, painelEntregasController.detalhe)
router.put("/entregas/:id/status", autenticarMiddleware, painelEntregasController.avancarStatus)
router.delete("/entregas/:id/cancelar", autenticarMiddleware, painelEntregasController.cancelar)

router.get("/motoristas", autenticarMiddleware, painelMotoristasController.index)
router.get("/motoristas/novo", autenticarMiddleware, painelMotoristasController.novo)
router.post("/motoristas", autenticarMiddleware, painelMotoristasController.criar)

export default router