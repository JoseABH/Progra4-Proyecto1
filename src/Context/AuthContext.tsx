import { createContext, useState, useEffect, ReactNode } from 'react'
import { useLogin } from '../hooks/useLogin'
import { decodeToken, client as axiosClient } from '../services/AuthService'

// 1. Tipo para el usuario
interface User {
  email: string
   name: string
  role: string
  id: string
  [key: string]: any // para otros campos del token
}

// 2. Tipo del contexto
interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  loginLoading: boolean
  loginError: boolean
}

// 3. Crear el contexto tipado
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 4. Props para el proveedor
interface AuthProviderProps {
  children: ReactNode
}

// 5. Implementar el proveedor
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const { mutateAsync: loginMutation, isLoading, isError } = useLogin()

  const login = async (email: string, password: string): Promise<User> => {
    const newToken = await loginMutation({ email, password })
    localStorage.setItem('authToken', newToken)
    axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`
    setToken(newToken)

    const data = decodeToken(newToken) 
    const newUser = {name: data.name  ,email: data.email, role: data.role, id: data.id }
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    delete axiosClient.defaults.headers.common.Authorization
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    const stored = localStorage.getItem('authToken')
    if (stored) {
      setToken(stored)
      axiosClient.defaults.headers.common.Authorization = `Bearer ${stored}`
      const data = decodeToken(stored) as User
      setUser({ name: data.name  ,email: data.email, role: data.role, id: data.id })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loginLoading: isLoading,
        loginError: isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
