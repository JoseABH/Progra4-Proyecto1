import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Login from '../components/Login';
import HomePage from './HomePage';

export default function LoginPage() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Layout debe estar dentro de un AuthProvider");
  const { user } = context;
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const backgroundVideos = [
    "https://videos.pexels.com/video-files/27082301/12066745_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/8902425/8902425-uhd_2732_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/32082671/13675698_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/4435750/4435750-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/6981411/6981411-hd_1920_1080_25fps.mp4"
  ];

  useEffect(() => {
    if (user) return;
    
    const videoTimer = setInterval(() => {
      // Iniciar transición a negro
      setIsTransitioning(true);
      
      setTimeout(() => {
        // Después de desvanecerse a negro, actualizar índices
        setCurrentVideoIndex(nextVideoIndex);
        setNextVideoIndex((nextVideoIndex + 1) % backgroundVideos.length);
        
        // Pequeña espera en negro y luego iniciar transición para mostrar nuevo video
        setTimeout(() => {
          setIsTransitioning(false);
        }, 200);
      }, 600); // Duración del fade out: 1 segundo
      
    }, 10000); // Cambiar video cada 10 segundos
    
    return () => clearInterval(videoTimer);
  }, [user, backgroundVideos.length, nextVideoIndex]);

  return (
    <div>
      {user ? (
        <HomePage />
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          {/* Videos de fondo con transiciones */}
          <div className="absolute inset-0 w-full h-full bg-black">
            {/* Video actual */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-80'}`}>
              <video 
                key={currentVideoIndex}
                src={backgroundVideos[currentVideoIndex]} 
                autoPlay 
                muted 
                loop 
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Capa semitransparente oscura permanente */}
            <div className="absolute inset-0 bg-opacity-50 z-10"></div>
          </div>
          
          {/* Contenido en primer plano */}
          <div className="relative z-20 w-full max-w-md px-4">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-semibold text-white">Sistema de Recursos Humanos</h1>
              <p className="text-sm text-gray-300">Centro Agrícola de Puntarenas</p>
            </div>
            <Login />
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-300">&copy; {new Date().getFullYear()} Centro Agrícola de Puntarenas. & Ing. Sistemas / Prog. IV <br /> Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}