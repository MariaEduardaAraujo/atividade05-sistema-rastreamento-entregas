import prisma from "../database/prisma.js"
import { IEntregasRepository } from "../interfaces/IEntregasRepository.js"

export class EntregasRepository extends IEntregasRepository{
    async listarTodos(){
        const entregas = await prisma.entrega.findMany()
        return entregas
    }
    async buscarPorId(id){
        const entrega = await prisma.entrega.findUnique({
            where: { id: id },
            include: { eventos: true, motorista: true }
        })

        if (!entrega) return null

        return entrega
    }
    async criar(dados){
        const novaEntrega = await prisma.entrega.create({ data: dados })
        return novaEntrega
    }
    async atualizar(id, dados) {
        const { historico, ...camposEntrega } = dados
        
        const atualiza = await prisma.entrega.update({
            where: { id: id },
            data: camposEntrega
        })

        if (historico) {
            await prisma.eventoEntrega.create({
                data: {
                    descricao: historico,
                    entregaId: id
                }
            })
        }

        return atualiza
    }
}