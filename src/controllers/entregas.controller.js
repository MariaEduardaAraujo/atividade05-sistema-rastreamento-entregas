export class EntregasController{
    constructor(service){
        this.service = service

        this.listarTodos = this.listarTodos.bind(this)
        this.buscarPorId = this.buscarPorId.bind(this)
        this.criar = this.criar.bind(this)
        this.avancar = this.avancar.bind(this)
        this.cancelar = this.cancelar.bind(this)
        this.historico = this.historico.bind(this)
        this.atribuir = this.atribuir.bind(this)
    }
    async listarTodos(req, res, next){
        try {
            const { status, motoristaId, createdDe, createdAte } = req.query
            const page = Math.max(1, parseInt(req.query.page) || 1)
            const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10))

            const resultado = await this.service.listarTodos({ status, motoristaId, createdDe, createdAte, page, limit })
            res.status(200).json(resultado)
        }catch (err){
            next(err)
        }
    }
    async buscarPorId(req, res, next){
        try{
            const entrega = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(entrega)
        }catch (err){
            next(err)
        }
    }
    async criar(req, res, next){
        try{
            const novaEntrega = await this.service.criar(req.body)
            res.status(201).json(novaEntrega)
        }catch (err){
            next(err)
        }
    }
    async avancar(req, res, next){
        try{
            const entrega = await this.service.avancar(Number(req.params.id))
            res.status(200).json(entrega)
        }catch (err){
            next(err)
        }
    }
    async cancelar(req, res, next){
        try{
            const entrega = await this.service.cancelar(Number(req.params.id))
            res.status(200).json(entrega)
        }catch (err){
            next(err)
        }
    }
    async historico(req, res, next){
        try {
            const historico = await this.service.historico(Number(req.params.id))
            res.status(200).json(historico)
        } catch (err) {
            next(err)
        }
    }
    async atribuir(req, res, next){
        try {
            const entrega = await this.service.atribuir(Number(req.params.id), Number(req.body.motoristaId))
            res.status(200).json(entrega)
        } catch (err) {
            next(err)
        }
    }
}