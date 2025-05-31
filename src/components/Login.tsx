import { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { fetchUsers } from '../services/userSevice';
import { User } from '../types/user';
import { FiMail, FiLock, FiLoader } from 'react-icons/fi';

export default function Login() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined. Ensure AuthProvider is wrapping the component tree.');
  }

  const { user, login, isError, isLoading } = authContext;
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // useEffect(() => {
  //   const savedUser = localStorage.getItem('user');
  //   if (savedUser) {
  //     try {
  //       const user: User = JSON.parse(savedUser);
  //       // setUser(user);
  //       navigate({ to: '/' });
  //     } catch (err) {
  //       console.error('Error parsing saved user:', err);
  //       localStorage.removeItem('user');
  //     }
  //   }
  // }, [setUser, navigate]);

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


      login(email, password)
      // const users = await fetchUsers();
      // const user = users.find(
      //   (u: User) => u.email === email && u.password === password
      // );
      
      // if (user) {
        // Instead of immediately navigating, first set loginSuccess to true

        //  setUser(user);
        //   if (rememberMe) {
        //     localStorage.setItem('user', JSON.stringify(user));
        //   } else {
        //     localStorage.removeItem('user');
        //   }

        //   // Wait for the fade-out animation to complete before navigating
        //   setTimeout(() => {
        //     navigate({ to: '/' });
        //   }, 800); // Match this with the CSS transition duration

        setTimeout(() => {
          navigate({ to: '/' });
        }, 800);
      // } else {
      //   setError('Credenciales incorrectas');
      // }

    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error al validar credenciales. Intente de nuevo.');
    } finally {
      if (!loginSuccess) {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`flex flex-col items-center max-w-md w-full transition-opacity duration-800 ease-in-out ${loginSuccess ? 'opacity-0' : 'opacity-100'}`}>
      <div className="bg-white rounded-lg shadow-md p-8 w-full border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://static.wixstatic.com/media/79ed12_8722dd62a5474ede83b761ba66cbf2f3~mv2.jpg/v1/fill/w_238,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/79ed12_8722dd62a5474ede83b761ba66cbf2f3~mv2.jpg"
            alt="Centro Agricola de Puntarenas"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-800">Recursos Humanos</h1>
          <p className="text-sm text-gray-600 mt-1">Centro Agrícola de Puntarenas</p>
        </div>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="email"
                type="email"
                placeholder="Correo electrónico"
                ref={emailRef}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="password"
                type="password"
                placeholder="Contraseña"
                ref={passwordRef}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-400"
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
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
              Mantener sesión iniciada
            </label>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Iniciando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}