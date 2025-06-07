import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { AuthProvider } from './Context/AuthContext';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import router from './routes';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('No se encontró el elemento root en el HTML');

const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
