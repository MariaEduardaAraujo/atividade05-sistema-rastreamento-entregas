export class IEntregasRepository{
    async listarTodos() {
        throw new Error("Método listarTodos() não implementado")
    }
    async buscarPorId(id) {
        throw new Error("Método buscarPorId() não implementado")
    }
    async criar(dados) {
        throw new Error("Método criar() não implementado")
    }
    async atualizar(id, dados) {
        throw new Error("Método atualizar() não implementado")
    }
}