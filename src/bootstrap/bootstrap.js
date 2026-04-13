import database from "../config/database.sqlite.js"
import { EntregasRepository } from "../repositories/entregas.repository.sqlite.js"
import { MotoristasRepository } from "../repositories/motoristas.repository.sqlite.js"
import { EntregasService } from "../services/entregas.service.js"
import { MotoristasService } from "../services/motoristas.service.js"
import { EntregasController } from "../controllers/entregas.controller.js"
import { MotoristasController } from "../controllers/motoristas.controller.js"
import { RelatoriosRepository} from "../repositories/relatorios.repository.sqlite.js"
import { RelatoriosService } from "../services/relatorios.service.js"
import { RelatoriosController } from "../controllers/relatorios.controller.js"

const entregasRepository = new EntregasRepository(database)
const motoristasRepository = new MotoristasRepository(database)
const relatoriosRepository = new RelatoriosRepository(database)
const entregasService = new EntregasService(entregasRepository, motoristasRepository)
const motoristasService = new MotoristasService(motoristasRepository, entregasRepository)
const relatoriosService = new RelatoriosService(relatoriosRepository)
const entregasController = new EntregasController(entregasService)
const motoristasController = new MotoristasController(motoristasService)
const relatoriosController = new RelatoriosController(relatoriosService)

export { entregasController, motoristasController, relatoriosController }
