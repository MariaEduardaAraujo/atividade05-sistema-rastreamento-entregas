import prisma from "../src/database/prisma.js"

async function main() {
    await prisma.eventoEntrega.deleteMany()
    await prisma.entrega.deleteMany()
    await prisma.motorista.deleteMany()

    const motorista1 = await prisma.motorista.create({
        data: { nome: "Carlos Silva", cpf: "111.111.111-11", placaVeiculo: "HUU8842" }
    })
    const motorista2 = await prisma.motorista.create({
        data: { nome: "Ana Souza", cpf: "222.222.222-22", placaVeiculo: "JWC5062" }
    })
    const motorista3 = await prisma.motorista.create({
        data: { nome: "Pedro Oliveira", cpf: "333.333.333-33", placaVeiculo: "LXB0380" }
    })

    // CRIADA - sem motorista
    await prisma.entrega.create({
        data: {
            descricao: "Caixa de eletrônicos",
            origem: "Maceió",
            destino: "São Paulo",
            status: "CRIADA",
            eventos: { create: [{ descricao: "Entrega criada no sistema" }] }
        }
    })

    await prisma.entrega.create({
        data: {
            descricao: "Documentos fiscais",
            origem: "Maceió",
            destino: "Recife",
            status: "CRIADA",
            eventos: { create: [{ descricao: "Entrega criada no sistema" }] }
        }
    })

    // EM_TRANSITO com motoristas
    await prisma.entrega.create({
        data: {
            descricao: "Peças automotivas",
            origem: "Santos",
            destino: "Aracaju",
            status: "EM_TRANSITO",
            motoristaId: motorista1.id,
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Motorista Carlos Silva atribuído à entrega" },
                    { descricao: "Status avançado para EM_TRANSITO" }
                ]
            }
        }
    })

    await prisma.entrega.create({
        data: {
            descricao: "Móveis para escritório",
            origem: "Manaus",
            destino: "Porto Alegre",
            status: "EM_TRANSITO",
            motoristaId: motorista2.id,
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Motorista Ana Souza designada" },
                    { descricao: "Status avançado para EM_TRANSITO" }
                ]
            }
        }
    })

    await prisma.entrega.create({
        data: {
            descricao: "Equipamentos hospitalares",
            origem: "Guarulhos",
            destino: "Recife",
            status: "EM_TRANSITO",
            motoristaId: motorista3.id,
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Motorista Pedro Oliveira atribuído à entrega" },
                    { descricao: "Status avançado para EM_TRANSITO" }
                ]
            }
        }
    })

    // ENTREGUE
    await prisma.entrega.create({
        data: {
            descricao: "Livros didáticos",
            origem: "Osasco",
            destino: "Campinas",
            status: "ENTREGUE",
            motoristaId: motorista1.id,
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Motorista Carlos Silva atribuído à entrega" },
                    { descricao: "Status avançado para EM_TRANSITO" },
                    { descricao: "Status avançado para ENTREGUE" }
                ]
            }
        }
    })

    await prisma.entrega.create({
        data: {
            descricao: "Alimentos não perecíveis",
            origem: "São Bernardo",
            destino: "Santos",
            status: "ENTREGUE",
            motoristaId: motorista2.id,
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Motorista Ana Souza designada" },
                    { descricao: "Status avançado para EM_TRANSITO" },
                    { descricao: "Status avançado para ENTREGUE" }
                ]
            }
        }
    })

    await prisma.entrega.create({
        data: {
            descricao: "Material de construção",
            origem: "Mauá",
            destino: "São Paulo",
            status: "ENTREGUE",
            motoristaId: motorista3.id,
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Motorista Pedro Oliveira atribuído à entrega" },
                    { descricao: "Status avançado para EM_TRANSITO" },
                    { descricao: "Status avançado para ENTREGUE" }
                ]
            }
        }
    })

    // CANCELADA
    await prisma.entrega.create({
        data: {
            descricao: "Eletrodomésticos",
            origem: "São Paulo",
            destino: "Guarulhos",
            status: "CANCELADA",
            motoristaId: motorista1.id,
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Motorista Carlos Silva atribuído à entrega" },
                    { descricao: "Status avançado para CANCELADA" }
                ]
            }
        }
    })

    await prisma.entrega.create({
        data: {
            descricao: "Produtos farmacêuticos",
            origem: "Diadema",
            destino: "Maceió",
            status: "CANCELADA",
            eventos: {
                create: [
                    { descricao: "Entrega criada no sistema" },
                    { descricao: "Status avançado para CANCELADA" }
                ]
            }
        }
    })

    console.log("Seed executado")
    console.log("- 3 motoristas criados")
    console.log("- 10 entregas criadas (2 CRIADA, 3 EM_TRANSITO, 3 ENTREGUE, 2 CANCELADA)")
}

main()
    .catch((e) => {
        console.error("Erro ao executar seed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
})