import database from "../config/database.sqlite.js"
import { IEntregasRepository } from "../interfaces/IEntregasRepository.js"

export class EntregasRepository extends IEntregasRepository{
    constructor(){
        super()
        this.database = database
    }
    listarTodos(){
        return this.database.prepare(
            "SELECT * FROM TAB_ENTREGAS"
        ).all()
    }
    buscarPorId(id){
        return this.database.prepare(
            "SELECT * FROM TAB_ENTREGAS WHERE id = ?"
        ).get(id) ?? null
    }
    criar(dados){
        const stmt = this.database.prepare(
            "INSERT INTO TAB_ENTREGAS (descricao, origem, destino, id_motorista) VALUES (?, ?, ?, ?)"
        )

        const info = stmt.run(
            dados.descricao,
            dados.origem,
            dados.destino,
            dados.id_motorista ?? null
        )

        return this.buscarPorId(info.lastInsertRowid)
    }
    atualizar(id, dados){
        const stmt = this.database.prepare(
            "UPDATE TAB_ENTREGAS SET descricao = ?, origem = ?, destino = ? WHERE id = ?"
        )
        
        const info = stmt.run(
            dados.descricao,
            dados.origem,
            dados.destino,
            id
        )

        if (info.changes === 0) return null
        return this.buscarPorId(id)
    }
}