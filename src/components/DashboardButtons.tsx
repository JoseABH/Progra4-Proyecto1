import { Link } from "@tanstack/react-router";

const DashboardButtons = () => {
  return (
    <div className="bg-gradient-to-br from-amber-700 to-amber-900 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Panel de Navegación</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/"
          className="bg-white text-amber-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-amber-100 transition"
        >
          Inicio
        </Link>
        <Link
          to="/login"
          className="bg-white text-amber-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-amber-100 transition"
        >
          Login
        </Link>
        <Link
          to="/en"
          className="bg-white text-amber-900 font-semibold py-2 px-4 rounded-lg text-center hover:bg-amber-100 transition"
        >
          Página EN
        </Link>
      </div>
    </div>
  );
};

export default DashboardButtons;
