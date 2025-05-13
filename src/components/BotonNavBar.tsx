import { Link } from "@tanstack/react-router";

import { ReactNode } from "react";

interface BotonNavBarProps {
  path: string;
  icono: ReactNode;
  nombre: string;
}

const BotonNavBar = ({ path, icono, nombre }: BotonNavBarProps) => {
  return (
    <Link to={path} className="flex items-center gap-3 hover:text-gray-300 hover:bg-sky-700 h-11 transition-all p-3 rounded hover:translate-x-2 focus:bg-sky-700">
      <span className="ml-1">{icono}</span>
      <span className="hidden group-hover:inline">{nombre}</span>
    </Link>
  );
};

export default BotonNavBar;
