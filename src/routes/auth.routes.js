import { Router } from "express"
import { autenticacaoController } from "../bootstrap/bootstrap.js"
import { autorizarMiddleware } from "../middlewares/autorizacao.middleware.js"
import { autenticarMiddleware } from "../middlewares/autenticacao.middleware.js"

const router = Router()

router.post("/registrar", autenticacaoController.criar)
router.post("/login", autenticacaoController.login)

export default router