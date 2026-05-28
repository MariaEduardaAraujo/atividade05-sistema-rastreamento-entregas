import { AppError } from "../utils/AppError.js"

const TRANSICOES_VALIDAS = {
    CRIADA: "EM_TRANSITO",
    EM_TRANSITO: "ENTREGUE"
}
 
const STATUS_FINAIS = ["ENTREGUE", "CANCELADA"]

export class EntregasService{
    constructor(entregasRepository, motoristasRepository){
        this.entregasRepository = entregasRepository
        this.motoristasRepository = motoristasRepository
    }
    async listarTodos({ status, motoristaId, createdDe, createdAte, page, limit } = {}){
        return this.entregasRepository.listarTodos({ status, motoristaId, createdDe, createdAte, page, limit })
    }
    async buscarPorId(id){
        const entrega = await this.entregasRepository.buscarPorId(id)
        if (!entrega) throw new AppError ("Entrega não encontrada", 404)
        return entrega
    }
    async criar({ descricao, origem, destino, motoristaId, criadorId }){
        if (origem === destino){
            throw new AppError("Origem e Destino não podem ser iguais", 400); 
        }
        const { data: todas } = await this.entregasRepository.listarTodos({ page: 1, limit: 9999 })
        const duplicadas = todas.find((e) => e.descricao === descricao && e.origem === origem && e.destino == destino && !STATUS_FINAIS.includes(e.status))

        if(duplicadas){
            throw new AppError("Existe uma entrega ativa com a mesma descrição, origem e destino", 409);
            
        }
        return this.entregasRepository.criar({ descricao, origem, destino, motoristaId: motoristaId ? Number(motoristaId) : null, criadorId: criadorId ? Number(criadorId) : null })
    }
    async avancar(id){
        const entrega = await this.buscarPorId(id)

        if (!entrega.motoristaId){
            throw new AppError("Atribua um motorista antes de avançar", 400)
        }
        if(STATUS_FINAIS.includes(entrega.status)){
            throw new AppError(`Não é possível avançar uma entrega com status ${entrega.status}`, 400);
        }
        const proximo = TRANSICOES_VALIDAS[entrega.status]
        if(!proximo){
            throw new AppError("Transição inválida", 400)
        }

        return this.entregasRepository.atualizar(id, { 
            status: proximo, 
            historico: `Status avançado para ${proximo}`
        })
    }
    async cancelar(id){
        const entrega = await this.buscarPorId(id)
        if(entrega.status === "ENTREGUE"){
            throw new AppError("Não é possível cancelar", 400);
        }
        if(entrega.status === "CANCELADA"){
            throw new AppError("Entrega já cancelada", 400);
        }

        return this.entregasRepository.atualizar(id, { 
            status: "CANCELADA", 
            historico: "Entrega cancelada"
        })
    }
    async historico(id){
        const entrega = await this.buscarPorId(id)
        return entrega.eventos
    }
    async atribuir(id, motoristaId){
        const entrega = await this.entregasRepository.buscarPorId(id)
        if (!entrega) throw new AppError("Entrega não encontrada", 404)
        if (entrega.status != "CRIADA") throw new AppError("Só é possível atribuir motorista a entregas com status CRIADA", 422);

        const motorista = await this.motoristasRepository.buscarPorId(motoristaId)
        if (!motorista) throw new AppError("Esse motorista não existe", 404);
        if (motorista.status != "ATIVO") throw new AppError("O status do motorista está inativo", 422);
        
        return this.entregasRepository.atualizar(id, {
            motoristaId: motoristaId,
            historico: `Motorista ${motorista.nome} atribuído à entrega`
        })
    }
}