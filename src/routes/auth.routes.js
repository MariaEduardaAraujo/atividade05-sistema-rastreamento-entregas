import { Router } from "express"
import { autenticacaoController } from "../bootstrap/bootstrap.js"

const router = Router()

router.post("/registrar", autenticacaoController.criar)
router.post("/login", autenticacaoController.login)

export default router