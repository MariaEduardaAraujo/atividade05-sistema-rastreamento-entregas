import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import Layout from '../components/Layout'

export default function NovaEntrega() {
  const [form, setForm] = useState({ descricao: '', origem: '', destino: '', motoristaId: '' })
  const [motoristas, setMotoristas] = useState([])
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/motoristas').then(({ data }) => setMotoristas(data.data ?? data)).catch(() => {})
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const payload = {
        ...form,
        motoristaId: form.motoristaId ? Number(form.motoristaId) : null
      }
      await api.post('/entregas', payload)
      navigate('/entregas')
    } catch (err) {
      setErro(err.response?.data?.mensagem || err.response?.data?.erro || 'Erro ao criar entrega')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Nova Entrega</h1>
          <p className="page-subtitle">Preencha os dados da entrega</p>
        </div>
        <Link to="/entregas" className="btn btn-ghost">← Voltar</Link>
      </div>

      <div className="card" style={{ maxWidth: 560 }}>
        {erro && <div className="alert alert-erro">{erro}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              value={form.descricao}
              onChange={e => setForm({ ...form, descricao: e.target.value })}
              placeholder="Ex: Caixa de eletrônicos"
              required
            />
          </div>
          <div className="form-group">
            <label>Origem</label>
            <input
              type="text"
              value={form.origem}
              onChange={e => setForm({ ...form, origem: e.target.value })}
              placeholder="Cidade de origem"
              required
            />
          </div>
          <div className="form-group">
            <label>Destino</label>
            <input
              type="text"
              value={form.destino}
              onChange={e => setForm({ ...form, destino: e.target.value })}
              placeholder="Cidade de destino"
              required
            />
          </div>
          <div className="form-group">
            <label>Motorista</label>
            <select value={form.motoristaId} onChange={e => setForm({ ...form, motoristaId: e.target.value })}>
              <option value="">Sem motorista</option>
              {motoristas.map(m => (
                <option key={m.id} value={m.id}>{m.nome} — {m.placaVeiculo}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="submit" className="btn btn-primary" disabled={carregando}>
              {carregando ? 'Criando...' : 'Criar Entrega'}
            </button>
            <Link to="/entregas" className="btn btn-ghost">Cancelar</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}
