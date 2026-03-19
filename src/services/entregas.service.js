export class EntregasService{
    constructor(repository){
        this.repository = repository
    }
    async listarTodos(){
        const entregas = await this.repository.listarTodos()
        return entregas
    }
    async buscarPorId(id){
        const entrega = await this.repository.buscarPorId(id)
        if (!entrega) return null
    }
    async criar(dados){
        return this.repository.criar(dados)
    }
    async atualizar(id, dados){
        return this.repository.atualizar(id, dados)
    }
}