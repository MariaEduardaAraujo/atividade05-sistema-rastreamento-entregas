import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import Entregas from './pages/Entregas'
import NovaEntrega from './pages/NovaEntrega'
import DetalheEntrega from './pages/DetalheEntrega'
import Motoristas from './pages/Motoristas'
import NovoMotorista from './pages/NovoMotorista'
import './pages/Pages.css'

function RotaProtegida({ children }) {
  const { usuario, carregando } = useAuth()
  if (carregando) return null
  return usuario ? children : <Navigate to="/login" replace />
}

function RotaGestor({ children }) {
  const { usuario, carregando } = useAuth()
  if (carregando) return null
  return usuario?.papel === 'GESTOR' ? children : <Navigate to="/entregas" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/entregas" element={<RotaProtegida><Entregas /></RotaProtegida>} />
          <Route path="/entregas/nova" element={<RotaProtegida><NovaEntrega /></RotaProtegida>} />
          <Route path="/entregas/:id" element={<RotaProtegida><DetalheEntrega /></RotaProtegida>} />
          <Route path="/motoristas" element={<RotaProtegida><Motoristas /></RotaProtegida>} />
          <Route path="/motoristas/novo" element={<RotaGestor><NovoMotorista /></RotaGestor>} />
          <Route path="*" element={<Navigate to="/entregas" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
