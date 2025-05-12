import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import '../App.css';
import { MdMapsHomeWork } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

import BotonNavBar from "./BotonNavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Layout debe estar dentro de un AuthProvider");
    const { user } = context;

    return (
        <div className="flex flex-col h-screen w-screen m-0">
            {/* Barra superior */}
            <header className="headerNav bg-sky-900 text-white px-6 flex items-center justify-between shadow m-1.5 rounded-lg ">
                <div className="text-xl font-bold flex items-center gap-2"><MdMapsHomeWork /> Centro Agricola de Puntarenas</div>
                <div className="text-sm">👤 {user || "Invitado"}</div>
            </header>

            {/* Contenedor principal: Sidebar + contenido */}
            <div className="sidebarPrincipal flex mx-1.5 ">
                {/* Sidebar lateral colapsado */}
                <aside className="group relative bg-sky-900 text-white transition-all duration-300 h-full w-16 hover:w-64 overflow-hidden flex flex-col rounded-lg ">
                    <nav className="mt-10 space-y-4 px-2">
                        <Link to="/" className="flex items-center gap-3 hover:text-gray-300">
                            <span>🏠</span>
                            <span className="hidden group-hover:inline">Home</span>
                        </Link>
                        <Link to="/login" className="flex items-center gap-3 hover:text-gray-300">
                            <span>🔑</span>
                            <span className="hidden group-hover:inline">Login</span>
                        </Link>
                        <Link to="/en" className="flex items-center gap-3 hover:text-gray-300">
                            <span>🌐</span>
                            <span className="hidden group-hover:inline">English</span>
                        </Link>
                        <Link to="/solicitudes" className="flex items-center gap-3 hover:text-gray-300">
                            <span>🌐</span>
                            <span className="hidden group-hover:inline">Solicitudes</span>
                        </Link>
                        <BotonNavBar path="/GestionSolicitudes" icono={<FaCalendarAlt />} nombre="Gestion Solicitudes" ></BotonNavBar>
                        <BotonNavBar path="/" icono="🏠" nombre="Home" ></BotonNavBar>
                        <BotonNavBar path="/" icono="🏠" nombre="Home" ></BotonNavBar>
                    </nav>

                    <div className="mt-auto px-4 pb-4">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>👤</span>
                            <span className="hidden group-hover:inline">Cerrar sesion</span>
                        </div>
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
