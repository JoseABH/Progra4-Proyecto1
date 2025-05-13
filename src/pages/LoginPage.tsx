import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Login from '../components/Login';

import HomePage from './HomePage';



export default function LoginPage() {

const context = useContext(AuthContext);
    if (!context) throw new Error("Layout debe estar dentro de un AuthProvider");
    const { user } = context;

  return (
    <div>
     {user ? <HomePage/>
     
    :<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Iniciar Sesión</h1>
        <Login />
      </div>
    </div>
    }
    </div>
  );
}