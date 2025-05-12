import React, { createContext, useState, ReactNode } from 'react'

// 1. Tipo del contexto
interface AuthContextType {
  user: any // puedes reemplazar `any` con un tipo más específico
  setUser: React.Dispatch<React.SetStateAction<any>>
}

// 2. Crear contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 3. Tipo para las props del proveedor
interface AuthProviderProps {
  children: ReactNode
}

// 4. AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
