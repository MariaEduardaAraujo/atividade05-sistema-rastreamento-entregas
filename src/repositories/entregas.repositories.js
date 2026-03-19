import { Database } from "../database/database.js"

export class EntregasRepository{
    constructor(){
        this.entregas = Database.getEntregas()
        this.nextId = Database.generateId()
    }
    async listarTodos(){
        return this.entregas
    }
    async buscarPorId(id){
        return this.entregas.find((e) => e.id === id) ?? null
    }
    async criar(dados){
        const novaEntrega = {
            id: this.nextId++,
            ...dados,
            status:  "CRIADA",
            historico: [{
                data: new Date().toISOString(),
                descricao 
            }]
        }
        this.entregas.push(novaEntrega)
        return(novaEntrega)
    }
    async atualizar(id, dados){
        const i = this.entregas.findIndex((e) => e.id === id)
        if (i === -1) return null
        this.entregas[i] = { ...this.entregas[i], ...dados, id}
        return this.entregas[i]
    }
}