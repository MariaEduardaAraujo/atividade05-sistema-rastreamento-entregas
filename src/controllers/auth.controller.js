export class AutenticacaoController{
    constructor (service){
        this.service = service

        this.criar = this.criar.bind(this)
        this.login = this.login.bind(this)
    }
    async criar(req, res, next){
        try {
            const usuario = await this.service.criar(req.body)
            res.status(201).json(usuario)
        } catch (err) {
            next(err)
        }
    }
    async login(req, res, next){
        try {
            const usuarioLogin = await this.service.login(req.body)
            res.status(200).json(usuarioLogin)
        } catch (err) {
            next(err)
        }
    }
}