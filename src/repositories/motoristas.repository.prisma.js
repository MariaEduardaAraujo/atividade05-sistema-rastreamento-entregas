import prisma from "../database/prisma.js"
import { IMotoristasRepository } from "../interfaces/IMotoristasRepository.js"

export class MotoristasRepository extends IMotoristasRepository{
    async listarTodos(){
            const motoristas = await prisma.motorista.findMany()
            return motoristas
        }
    async buscarPorId(id){
        const motorista = await prisma.motorista.findUnique({
            where: { id: id },
            include: { entregas: true }
        })

        if (!motorista) return null
        return motorista
    }
   async buscarPorCPF(cpf){
        const motorista = await prisma.motorista.findUnique({
            where: { cpf: cpf },
            include: { eventos: true, entrega: true }
        })

        if (!motorista) return null
        return motorista
    }
    async criar(dados){
        const novoMotorista = await prisma.motorista.create({ data: dados })
        return novoMotorista
    }
    async atualizar(id, dados) {
        const atualiza = await prisma.motorista.update({
            where: { id: id },
            data: dados
        })

        return atualiza
    }
}