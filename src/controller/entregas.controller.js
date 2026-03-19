export class EntregasController{
    constructor(){
        this.service = service

        this.listarTodos = this.listarTodos.bind(this)
        this.buscarPorId = this.buscarPorId.bind(this)
        this.criar       = this.criar.bind(this)
    
    }
    async listarTodos(req, res){
        const entregas = await this.service.listarTodos()
        res.status(200).json(entregas)
    }
    async buscarPorId(req, res){
        const entrega = await this.service.buscarPorId(Number(req.params.id))
        res.status(200).json(entrega)
    }
    async criar(req, res){
        const novaEntrega = await this.service.criar(req.body)
        res.status(201).json(novaEntrega)
    }
    async atualizar(req, res){
        const atualiza = await this.service.atualizar(Number(req.params.id), req.body)
        res.status(200).json(atualiza)
    }
}