import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

export default function DetalheEntrega() {
  const { id } = useParams()
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [entrega, setEntrega] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
  const [acao, setAcao] = useState('')

  async function carregar() {
    try {
      const { data } = await api.get(`/entregas/${id}`)
      setEntrega(data)
    } catch {
      navigate('/entregas')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregar() }, [id])

  async function avancar() {
    setAcao('avancar')
    try {
      await api.patch(`/entregas/${id}/avancar`)
      setMensagem({ tipo: 'sucesso', texto: 'Status atualizado!' })
      carregar()
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.response?.data?.mensagem || 'Erro ao avançar' })
    } finally { setAcao('') }
  }

  async function cancelar() {
    if (!confirm('Cancelar esta entrega?')) return
    setAcao('cancelar')
    try {
      await api.patch(`/entregas/${id}/cancelar`)
      setMensagem({ tipo: 'sucesso', texto: 'Entrega cancelada.' })
      carregar()
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: err.response?.data?.mensagem || 'Erro ao cancelar' })
    } finally { setAcao('') }
  }

  if (carregando) return <Layout><p style={{ color: 'var(--muted)' }}>Carregando...</p></Layout>
  if (!entrega) return null

  const statusFinais = ['ENTREGUE', 'CANCELADA']

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Entrega #{entrega.id}</h1>
          <span className={`badge badge-${entrega.status}`}>{entrega.status}</span>
        </div>
        <Link to="/entregas" className="btn btn-ghost">← Voltar</Link>
      </div>

      {mensagem.texto && (
        <div className={`alert alert-${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--font-head)', marginBottom: 16, fontSize: 16 }}>Detalhes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Descrição', value: entrega.descricao },
              { label: 'Origem', value: entrega.origem },
              { label: 'Destino', value: entrega.destino },
              { label: 'Motorista', value: entrega.motorista?.nome || '—' },
              { label: 'Criado em', value: new Date(entrega.createdAt).toLocaleString('pt-BR') },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>{label}</span>
                <span style={{ fontSize: 14 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontFamily: 'var(--font-head)', marginBottom: 16, fontSize: 16 }}>Ações</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {!statusFinais.includes(entrega.status) && (
              <button
                className="btn btn-success"
                onClick={avancar}
                disabled={acao === 'avancar'}
              >
                {acao === 'avancar' ? 'Avançando...' : '▶ Avançar Status'}
              </button>
            )}
            {usuario?.papel === 'GESTOR' && !statusFinais.includes(entrega.status) && (
              <button
                className="btn btn-danger"
                onClick={cancelar}
                disabled={acao === 'cancelar'}
              >
                {acao === 'cancelar' ? 'Cancelando...' : '✕ Cancelar Entrega'}
              </button>
            )}
            {statusFinais.includes(entrega.status) && (
              <p style={{ color: 'var(--muted)', fontSize: 13 }}>Nenhuma ação disponível.</p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: 'var(--font-head)', marginBottom: 16, fontSize: 16 }}>Histórico de Eventos</h2>
        {entrega.eventos?.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Nenhum evento registrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {entrega.eventos?.map(ev => (
                <tr key={ev.id}>
                  <td style={{ color: 'var(--muted)' }}>{new Date(ev.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td style={{ color: 'var(--muted)' }}>{new Date(ev.createdAt).toLocaleTimeString('pt-BR')}</td>
                  <td>{ev.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
