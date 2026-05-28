import database from "../config/database.sqlite.js"
import { EntregasRepository } from "../repositories/entregas.repository.prisma.js"
import { MotoristasRepository } from "../repositories/motoristas.repository.prisma.js"
import { EntregasService } from "../services/entregas.service.js"
import { MotoristasService } from "../services/motoristas.service.js"
import { EntregasController } from "../controllers/entregas.controller.js"
import { MotoristasController } from "../controllers/motoristas.controller.js"
import { RelatoriosRepository} from "../repositories/relatorios.repository.sqlite.js"
import { RelatoriosService } from "../services/relatorios.service.js"
import { RelatoriosController } from "../controllers/relatorios.controller.js"
import { EntregasController as PainelEntregasController } from "../controllers/painel/entregas.controller.js"
import { MotoristasController as PainelMotoristasController } from "../controllers/painel/motoristas.controller.js"
import { UsuariosRepository} from "../repositories/usuarios.repository.prisma.js"
import { AutenticacaoService} from "../services/auth.service.js"
import { AutenticacaoController } from "../controllers/auth.controller.js"

const entregasRepository = new EntregasRepository(database)
const motoristasRepository = new MotoristasRepository(database)
const relatoriosRepository = new RelatoriosRepository(database)
const usuariosRepositoy = new UsuariosRepository(database)
const entregasService = new EntregasService(entregasRepository, motoristasRepository)
const motoristasService = new MotoristasService(motoristasRepository, entregasRepository)
const relatoriosService = new RelatoriosService(relatoriosRepository)
const autenticacaoService = new AutenticacaoService(usuariosRepositoy)
const entregasController = new EntregasController(entregasService)
const motoristasController = new MotoristasController(motoristasService)
const relatoriosController = new RelatoriosController(relatoriosService)
const autenticacaoController = new AutenticacaoController(autenticacaoService)

const painelEntregasController = new PainelEntregasController(entregasService, motoristasService)
const painelMotoristasController = new PainelMotoristasController(motoristasService)

export { entregasController, motoristasController, relatoriosController, painelEntregasController, painelMotoristasController, autenticacaoController }