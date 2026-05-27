    import bcrypt from 'bcrypt'
    import { AppError } from "../utils/AppError.js"
    import { gerarAccessToken } from '../utils/jwt.js'

    export class AutenticacaoService{
        constructor (usuariosRepository){
            this.usuariosRepository = usuariosRepository
        }
        async criar({ nome, email, senha, papel = "OPERADOR" }){
            const autenticacaoEmail = await this.usuariosRepository.buscarPorEmail(email)
            if(autenticacaoEmail){
                throw new AppError("E-mail duplicado", 409);
            }

            const senhaHash = await bcrypt.hash(senha, 10);
            return this.usuariosRepository.criar({ nome, email, senhaHash, papel })
        }
        async login({ email, senha }) {
            const emailUser = await this.usuariosRepository.buscarPorEmail(email)
            if (!emailUser) throw new AppError("Credenciais inválidas", 401)

            const senha = await bcrypt.compare(senha, usuario.senhaHash)
            if (!senha) throw new AppError("Credenciais inválidas", 401)

            const token = gerarAccessToken({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                papel: usuario.papel
            })
            return { accessToken: token }
        }
    }
