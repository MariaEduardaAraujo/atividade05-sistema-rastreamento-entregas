import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('usuario')
    if (token && user) {
      setUsuario(JSON.parse(user))
    }
    setCarregando(false)
  }, [])

  function login(token, dadosUsuario) {
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario))
    setUsuario(dadosUsuario)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
