import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { fetchUsers } from '../services/userSevice';
import { User } from '../types/user';

export default function Login() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined. Ensure AuthProvider is wrapping the component tree.');
  }

  const { setUser } = authContext;
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError('Por favor, ingrese correo y contraseña');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const users = await fetchUsers();
      const user = users.find(
        (u: User) => u.email === email && u.password === password
      );

      if (user) {
        setUser(user); // Set full user object for AuthContext
        navigate({ to: '/' });
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error al validar credenciales. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
      <input
        type="email"
        placeholder="Correo"
        ref={emailRef}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Contraseña"
        ref={passwordRef}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        {loading ? 'Cargando...' : 'Ingresar'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}