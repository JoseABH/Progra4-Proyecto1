
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import '../App.css';
import { MdMapsHomeWork, MdExitToApp } from "react-icons/md";
import { FaCalendarAlt, FaUsers, FaUserCog, FaUserCircle, FaCalendarPlus, FaCalendarWeek } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import BotonNavBar from "./BotonNavBar";
// import { useNavigate } from '@tanstack/react-router';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const context = useContext(AuthContext);
    // const navigate = useNavigate();

    if (!context) throw new Error("Layout debe estar dentro de un AuthProvider");
    const { user,logout } = context;

    // const handleLogout = () => {
    //     setUser(null);
    //     localStorage.removeItem('user');
    //     navigate({ to: '/login' });
    // };

    const initials = user?.name
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('');
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;


    return (
        <div className="flex flex-col h-screen w-screen m-0">
            {/* Barra superior */}
            <header className="headerNav bg-sky-900 text-white px-6 flex items-center justify-between shadow m-1.5 rounded-lg">
                <div className="text-2xl font-bold flex items-center gap-3">
                    <img 
                        src="https://static.wixstatic.com/media/79ed12_8722dd62a5474ede83b761ba66cbf2f3~mv2.jpg/v1/fill/w_238,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/79ed12_8722dd62a5474ede83b761ba66cbf2f3~mv2.jpg" 
                        alt="logo" 
                        className="rounded-full w-12 h-12 border-2 border-white/20 shadow-lg transition-transform hover:scale-105" 
                    />
                    <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Centro Agricola de Puntarenas
                    </span>
                </div>
                <div className="text-lg flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-blue-200 text-sm font-medium">{user?.role}</span>
                        <span className="text-white font-semibold">{user?.name || "Invitado"}</span>
                    </div>
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 border-2 border-white/30 shadow-lg transition-transform hover:scale-110"
                        style={{ backgroundColor: randomColor }}
                    >
                        {initials}
                    </div>
                </div>
                {/* <FaUserCircle /> */}
      
            </header >

    {/* Contenedor principal: Sidebar + contenido */ }
    < div className = "sidebarPrincipal flex mx-1.5" >
        {/* Sidebar lateral colapsado */ }
        < aside className = "group relative bg-sky-900 text-white transition-all duration-300 h-full w-16 hover:w-64 overflow-hidden flex flex-col rounded-lg" >
                    <nav className="mt-10 space-y-4 px-2">
                        {user?.role === "Jefe de RRHH" || user?.role === "admin"  ? (
                            <>
                                <BotonNavBar path="/" icono={<AiFillHome />} nombre="Home" />
                                <BotonNavBar path="/CrearSolicitudes" icono={<FaCalendarPlus />} nombre="Crear Solicitudes" />
                                <BotonNavBar path="/GestionEmpleados" icono={<FaUsers />} nombre="Gestion de Empleados" />
                                <BotonNavBar path="/solicitudes" icono={<FaCalendarWeek />} nombre="Gestion de solicitudes" />
                                <BotonNavBar path="/GestionSolicitudes" icono={<FaCalendarAlt />} nombre="Vista de Solicitudes" />
                                <BotonNavBar path="/GestionUsers" icono={<FaUserCog />} nombre="Gestion Usuarios" />
                            </>
                        ) : user?.role === "Jefe de Departamento" ? (
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

                    <div className="mt-auto px-2 mb-2 group  ">
                        <button
                            onClick={logout}
                            className="w-full flex items-center px-3 py-2 text-white rounded hover:translate-x-2 hover:bg-sky-700  duration-200"
                        >
                            <MdExitToApp className="mr-2 text-xl" />
                            <span className=" hidden group-hover:inline">Cerrar sesion</span>
                        </button>
                    </div>
                </aside >

    {/* Contenido principal */ }
    < main className = "mainPrincipal flex-1 p-6 overflow-y-auto ml-1.5 bg-white rounded-lg" >
        { children }
                </main >
            </div >
        </div >
    );
};

export default Layout;