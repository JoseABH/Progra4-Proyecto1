import { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { fetchUsers } from '../services/userSevice'; // Fixed typo
import { User } from '../types/user';
import { FiMail, FiLock, FiLoader } from 'react-icons/fi';

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
  const [rememberMe, setRememberMe] = useState(false);

  // Check localStorage for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        setUser(user);
        navigate({ to: '/' });
      } catch (err) {
        console.error('Error parsing saved user:', err);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
  }, [setUser, navigate]);

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
        setUser(user);
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
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
    <div className="">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="text-gray-500 mt-2">Accede a tu cuenta para continuar</p>
        </div>
        <form className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu correo"
                ref={emailRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                ref={passwordRef}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Recordar sesión
            </label>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Cargando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}