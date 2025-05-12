import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider } from './Context/AuthContext'
import { RouterProvider } from '@tanstack/react-router'
import router from './routes'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('No se encontró el elemento root en el HTML')

const root = createRoot(rootElement)

root.render(
  <AuthProvider>

    <RouterProvider router={router} />
  </AuthProvider>
)
