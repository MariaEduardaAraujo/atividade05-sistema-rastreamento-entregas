import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const { usuario } = useAuth()

  useEffect(() => {
    api.get('/motoristas')
      .then(({ data }) => setMotoristas(data.data ?? data))
      .catch(() => {})
      .finally(() => setCarregando(false))
  }, [])

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Motoristas</h1>
          <p className="page-subtitle">{motoristas.length} cadastrados</p>
        </div>
        {usuario?.papel === 'GESTOR' && (
          <Link to="/motoristas/novo" className="btn btn-primary">+ Novo Motorista</Link>
        )}
      </div>

      <div className="card">
        {carregando ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 32 }}>Carregando...</p>
        ) : motoristas.length === 0 ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 32 }}>Nenhum motorista cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Placa</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {motoristas.map(m => (
                <tr key={m.id}>
                  <td style={{ color: 'var(--muted)' }}>#{m.id}</td>
                  <td>{m.nome}</td>
                  <td style={{ color: 'var(--muted)' }}>{m.cpf}</td>
                  <td>{m.placaVeiculo}</td>
                  <td><span className={`badge badge-${m.status}`}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
