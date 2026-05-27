import prisma from "../database/prisma.js"

export class UsuariosRepository{
    constructor(database){
        this.database = database
    }
    async criar(dados){
        const novoUsuario = await prisma.usuario.create({data: dados})
        return novoUsuario
    }
    async buscarPorEmail(email){
        const usuario = await prisma.usuario.findUnique({
            where: {email}
        })
        return usuario
    }
}