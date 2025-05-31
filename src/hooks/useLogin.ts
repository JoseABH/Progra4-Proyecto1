import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../services/AuthService'

interface LoginParams {
  email: string
  password: string
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation<string, Error, LoginParams>({
    // mutationFn es el POST a /login
    mutationFn: async ({ email, password }) => {
      return await login({ email, password }) // <- Esto debe devolver un string (token)
    },

    // al hacer login exitoso
    onSuccess: (token) => {
      queryClient.setQueryData(['authToken'], token)
    },

    // si hay error
    onError: (err) => {
      console.error('Login failed:', err)
    },
  })
}
