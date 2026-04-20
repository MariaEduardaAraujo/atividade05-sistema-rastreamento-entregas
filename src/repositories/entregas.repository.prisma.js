import prisma from "../database/prisma.js"
import { IEntregasRepository } from "../interfaces/IEntregasRepository.js"

export class EntregasRepository extends IEntregasRepository{
    async listarTodos({ page = 1, limit = 10, status, motoristaId, createdDe, createdAte}){
        const where = {
            ...(status && { status }), 
            ...(motoristaId && { motoristaId: Number(motoristaId) }),
            ...(( createdDe || createdAte ) && {
                createdAt: {
                    ...(createdDe && { gte: new Date(createdDe)}),
                    ...(createdAte && { lte: new Date(createdAte)})
                }
            })
        }
        const [ data, total ] = await Promise.all([
            prisma.entrega.findMany({
                where, 
                skip: (page - 1) * limit,
                take: limit,
                include: {motorista: true, eventos: true}
            }),
            prisma.entrega.count({ where })
        ])
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
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