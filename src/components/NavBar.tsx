import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import '../App.css';
import { MdMapsHomeWork, MdExitToApp } from "react-icons/md";
import { FaCalendarAlt, FaUsers, FaUserCog, FaUserCircle, FaCalendarPlus, FaCalendarWeek } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import BotonNavBar from "./BotonNavBar";
import { useNavigate } from '@tanstack/react-router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) throw new Error("Layout debe estar dentro de un AuthProvider");
  const { user, setUser } = context;

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate({ to: '/login' });
  };

  return (
    <div className="flex flex-col h-screen w-screen m-0">
      {/* Barra superior */}
      <header className="headerNav bg-sky-900 text-white px-6 flex items-center justify-between shadow m-1.5 rounded-lg">
        <div className="text-2xl font-bold flex items-center gap-2">
          <MdMapsHomeWork /> Centro Agricola de Puntarenas
        </div>
        <div className="text-xl flex items-center gap-4">
          {user.role} | {user.name || "Invitado"} <FaUserCircle />
        </div>
      </header>

      {/* Contenedor principal: Sidebar + contenido */}
      <div className="sidebarPrincipal flex mx-1.5">
        {/* Sidebar lateral colapsado */}
        <aside className="group relative bg-sky-900 text-white transition-all duration-300 h-full w-16 hover:w-64 overflow-hidden flex flex-col rounded-lg">
          <nav className="mt-10 space-y-4 px-2">
            {user.role === "Jefe de RRHH" ? (
              <>
                <BotonNavBar path="/" icono={<AiFillHome />} nombre="Home" />
                <BotonNavBar path="/CrearSolicitudes" icono={<FaCalendarPlus />} nombre="Crear Solicitudes" />
                <BotonNavBar path="/GestionEmpleados" icono={<FaUsers />} nombre="Gestion de Empleados" />
                <BotonNavBar path="/solicitudes" icono={<FaCalendarWeek />} nombre="Gestion de solicitudes" />
                <BotonNavBar path="/GestionSolicitudes" icono={<FaCalendarAlt />} nombre="Vista de Solicitudes" />
                <BotonNavBar path="/GestionUsers" icono={<FaUserCog />} nombre="Gestion Usuarios" />
              </>
            ) : user.role === "Jefe de Departamento" ? (
              <>
                <BotonNavBar path="/" icono={<AiFillHome />} nombre="Home" />
                <BotonNavBar path="/CrearSolicitudes" icono={<FaCalendarPlus />} nombre="Crear Solicitudes" />
                <BotonNavBar path="/solicitudes" icono={<FaCalendarWeek />} nombre="Revisar Solicitudes" />
              </>
            ) : (
              <>
                <BotonNavBar path="/" icono={<AiFillHome />} nombre="Home" />
                <BotonNavBar path="/CrearSolicitudes" icono={<FaCalendarPlus />} nombre="Crear Solicitudes" />
              </>
            )}
          </nav>

          <div className="mt-auto px-2 mb-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-white hover:bg-sky-800 rounded-md transition-colors duration-200"
            >
              <MdExitToApp className="mr-2 text-xl" />
              <span className="truncate">Cerrar sesion</span>
            </button>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="mainPrincipal flex-1 p-6 overflow-y-auto ml-1.5 bg-white rounded-lg">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;