import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import './Auth.css'

export default function Registrar() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', papel: 'OPERADOR' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await api.post('/auth/registrar', form)
      navigate('/login')
    } catch (err) {
      setErro(err.response?.data?.erro || err.response?.data?.mensagem || 'Erro ao registrar')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">▲</span>
          <h1>Criar Conta</h1>
          <p>Registre-se no sistema</p>
        </div>
        {erro && <div className="alert alert-erro">{erro}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              placeholder="Seu nome"
              required
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={form.senha}
              onChange={e => setForm({ ...form, senha: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="form-group">
            <label>Papel</label>
            <select value={form.papel} onChange={e => setForm({ ...form, papel: e.target.value })}>
              <option value="OPERADOR">Operador</option>
              <option value="GESTOR">Gestor</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={carregando}>
            {carregando ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
