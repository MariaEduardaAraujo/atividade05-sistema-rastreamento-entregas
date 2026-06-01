import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import Layout from '../components/Layout'

export default function NovoMotorista() {
  const [form, setForm] = useState({ nome: '', cpf: '', placaVeiculo: '' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await api.post('/motoristas', form)
      navigate('/motoristas')
    } catch (err) {
      setErro(err.response?.data?.mensagem || err.response?.data?.erro || 'Erro ao cadastrar')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Novo Motorista</h1>
          <p className="page-subtitle">Preencha os dados do motorista</p>
        </div>
        <Link to="/motoristas" className="btn btn-ghost">← Voltar</Link>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        {erro && <div className="alert alert-erro">{erro}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              placeholder="Nome completo"
              required
            />
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              value={form.cpf}
              onChange={e => setForm({ ...form, cpf: e.target.value })}
              placeholder="000.000.000-00"
              required
            />
          </div>
          <div className="form-group">
            <label>Placa do Veículo</label>
            <input
              type="text"
              value={form.placaVeiculo}
              onChange={e => setForm({ ...form, placaVeiculo: e.target.value })}
              placeholder="ABC-1234"
              required
            />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="submit" className="btn btn-primary" disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <Link to="/motoristas" className="btn btn-ghost">Cancelar</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}
