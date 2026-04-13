export class RelatoriosRepository{
    constructor(database){
        this.database = database
    }
    entregaPorStatus(){
        return this.database.prepare(
            "SELECT status, count(*) as total FROM TAB_ENTREGAS GROUP BY status"
        ).all() 
    }
    motoristasAtivos(){
        return this.database.prepare(`
            SELECT m.id as motoristaId, m.nome, COUNT(e.id) as EntregasEmAberto FROM TAB_MOTORISTAS m 
            JOIN TAB_ENTREGAS e ON e.id_motorista = m.id
            WHERE e.status NOT IN ('ENTREGUE', 'CANCELADA')
            GROUP BY m.id, m.nome`
        ).all()
    }
}