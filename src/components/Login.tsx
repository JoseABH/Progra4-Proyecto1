import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FiMail, FiLock, FiLoader, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is undefined. Ensure AuthProvider is wrapping the component tree.');
  }

  const { login } = authContext;
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError('Por favor, ingrese correo y contraseña');
      setShowError(true);
      return;
    }

    setError(null);
    setShowError(false);
    setLoading(true);
try {
  await login(email, password);
  setLoading(false);
  setWelcomeMessage(`Bienvenido, ${email}. Accediendo al sistema...`);
  setIsFading(true);
  setTimeout(() => {
    navigate({ to: '/' });
  }, 2500);
} catch (err: any) {
  console.error('Error during login:', err);

  if (err?.response?.status === 401) {
    // Credenciales incorrectas
    setError('Credenciales incorrectas.');
  } else if (err?.message?.includes('Network Error') || !err.response) {
    // Sin conexión al servidor
    setError('No se pudo conectar al servidor. Verifica tu conexión a internet.');
  } else {
    // Otro error del servidor
    setError('Error inesperado en el servidor. Intenta más tarde.');
  }

  setShowError(true);
  setLoading(false);
}
}
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && !isFading) {
      handleLogin();
    }
  };

  if (error && !showError) {
    setShowError(true);
  } else if (!error && showError) {
    setShowError(false);
  }

  return (
    <div
      className={`w-full max-w-md transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Main Card */}
      <div className="bg-white/96 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 text-center border-b border-gray-100">
          <div className="relative">
            <img
              src="https://static.wixstatic.com/media/79ed12_8722dd62a5474ede83b761ba66cbf2f3~mv2.jpg/v1/fill/w_238,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/79ed12_8722dd62a5474ede83b761ba66cbf2f3~mv2.jpg"
              alt="Centro Agricola de Puntarenas"
              className="w-23 rounded-full mx-auto mb-4 border-2 border-gray-200 shadow-sm"
            />
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Sistema de Recursos Humanos</h1>
            <p className="text-gray-600 text-sm font-medium">Centro Agrícola de Puntarenas</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Welcome Message */}
          {welcomeMessage && !error && (
            <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-lg text-green-700 text-center font-medium">
              <span>{welcomeMessage}</span>
            </div>
          )}

          <form className="space-y-5" onKeyPress={handleKeyPress}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="usuario@centroagricola.com"
                  ref={emailRef}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  ref={passwordRef}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                  Mantener sesión iniciada
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading || isFading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" size={18} />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <span>Iniciar Sesión</span>
              )}
            </button>

            {/* Error Message */}
            {error && showError && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700 text-center font-medium">
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-600">
              Soporte técnico:{' '}
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                soporte@centroagricola.com
              </button>
            </p>
           <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Centro Agrícola de Puntarenas. & Ing. Sistemas / Prog. IV <br /> Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}