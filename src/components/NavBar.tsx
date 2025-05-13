import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import '../App.css';
import { MdMapsHomeWork,MdExitToApp  } from "react-icons/md";

import { FaCalendarAlt, FaUsers ,FaUserCog,FaUserCircle,FaCalendarPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";




import BotonNavBar from "./BotonNavBar";


const Layout = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Layout debe estar dentro de un AuthProvider");
    const { user,setUser } = context;
 
    return (
        <div className="flex flex-col h-screen w-screen m-0">
            {/* Barra superior */}
            <header className="headerNav bg-sky-900 text-white px-6 flex items-center justify-between shadow m-1.5 rounded-lg ">
                <div className="text-2xl font-bold flex items-center gap-2"><MdMapsHomeWork /> Centro Agricola de Puntarenas</div>
                <div className="text-xl flex items-center gap-4">{user || "Invitado"} <FaUserCircle /> </div>
                <div className="text-xl flex items-center gap-4">{user || "Invitado"} <FaUserCircle /> </div>
            </header>

            {/* Contenedor principal: Sidebar + contenido */}
            <div className="sidebarPrincipal flex mx-1.5 ">
                {/* Sidebar lateral colapsado */}
                <aside className="group relative bg-sky-900 text-white transition-all duration-300 h-full w-16 hover:w-64  overflow-hidden flex flex-col rounded-lg ">
                    <nav className="mt-10 space-y-4 px-2">
                       
                       
                         <BotonNavBar path="/" icono={<AiFillHome />} nombre="Home" ></BotonNavBar>

                        
                        <Link to="/login" className="flex items-center gap-3 hover:text-gray-300">
                            <span>🔑</span>
                            <span className="hidden group-hover:inline">Login</span>
                        </Link>
                        <Link to="/en" className="flex items-center gap-3 hover:text-gray-300">
                            <span>🌐</span>
                            <span className="hidden group-hover:inline">English</span>
                        </Link>
                        <Link to="/GestionEmpleados" className="flex items-center gap-3 hover:text-gray-300">
                             <FaUsers className="h-5 w-5" />
                            <span className="hidden group-hover:inline">Gestion de Empleados</span>
                        </Link>


                        <Link to="/solicitudes" className="flex items-center gap-3 hover:text-gray-300">
                            <span>🌐</span>
                            <span className="hidden group-hover:inline">Solicitudes</span>
                        </Link>
                        <BotonNavBar path="/CrearSolicitudes" icono={<FaCalendarPlus />} nombre="Crear Solicitudes" ></BotonNavBar>
                        <BotonNavBar path="/GestionSolicitudes" icono={<FaCalendarAlt />} nombre="Gestion Solicitudes" ></BotonNavBar>

                    
                        <Link to="/User" className="flex items-center gap-3 hover:text-gray-300">
                            <span>👥</span>
                            <span className="hidden group-hover:inline">Gestion de Usarios</span>
                        </Link>

                           <BotonNavBar path="/GestionUsers" icono={<FaUserCog />} nombre="Gestion Usuarios" ></BotonNavBar>


                    </nav>

                    <div className="mt-auto px-2 mb-2 ">
                        <BotonNavBar path="/login" icono={<MdExitToApp />} nombre="Cerrar sesion" ></BotonNavBar>

                        
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
